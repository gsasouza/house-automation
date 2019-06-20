import * as five from 'johnny-five'
import { Board as BoardType } from 'johnny-five'
import { EtherPortClient } from 'etherport-client';


import { SERIAL_PORT, Board } from '@gsasouza/shared'
import { initIO } from './IOSetup'

export enum BoardsEnum {
  RASPBERRY = 'RASPBERRY',
  ARDUINO = 'ARDUINO',
  ESP8266 = 'ESP8266'
}

const configDefault = SERIAL_PORT ? { port: SERIAL_PORT } : {}

export const createBoard = (config = configDefault) => new Promise(
  (resolve, reject) => {
    const board = new five.Board({ ...config, repl: false });
    board.on('ready', () => resolve(board))
    board.on('fail', () =>  reject('Failed to init board') );
  }
);

export const createBoards = async (): Promise<Array<BoardType>> => {
  const boards = await Board.find({});
  return new Promise((resolve) => {
    new five.Boards(
      boards.map(({ _id, port, type }) => {
        if (type === BoardsEnum.ESP8266) {
          return {
            id: _id,
            port: new EtherPortClient({
              host: '192.168.15.23',
              port: 3030
            })
          };
        }
        return { id: _id, port };
      })
    ).on('ready', function () {
      resolve(Array.from(this))
    })
  })
}

export const initBoards = async () => {
  const boards = await createBoards();
  const boardsWithPins = [];
  for (const board of boards) {
    const pins = await initIO(board);
    boardsWithPins.push({ ...board, pins });
  }
  return boardsWithPins;
}
