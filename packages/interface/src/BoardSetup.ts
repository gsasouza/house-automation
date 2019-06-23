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

export const createBoard = (config) => new Promise(
  (resolve, reject) => {
    const board = new five.Board({ ...config, repl: false });
    board.on('ready', () => resolve(board))
    board.on('error', () => reject('Error on init board'))
    board.on('fail', () =>  reject('Failed to init board'));
  }
);

export const createBoards = async (): Promise<Array<BoardType>> => {
  const boards = await Board.find({});
  const connectedBoards = [];
  for (const board of boards) {
    const {_id, port, type, host} = board;
    try {
      if (type === BoardsEnum.ESP8266) {
        connectedBoards.push(await createBoard({
          id: _id,
          port: new EtherPortClient({
            host,
            port: 3030
          })
        }));
      } else {
        connectedBoards.push(await createBoard({id: _id, port}));
      }
    } catch (e) {
      console.log(`error when connecting board ${_id}`)
    }
  }
  return connectedBoards;
}

export const initBoards = async () => {
  const boards = await createBoards();
  const boardsWithPins = [];
  for (const board of boards) {
    try {
      const pins = await initIO(board);
      boardsWithPins.push({ ...board, pins });
    } catch(e) {
      console.log(e);
    }

  }
  return boardsWithPins;

}
