import * as five from 'johnny-five'
import { Board as BoardType } from 'johnny-five'
import { EtherPortClient } from 'etherport-client';


import { publishMessage, Board } from '@gsasouza/shared'
import { initIO } from './IOSetup'

export enum BoardsEnum {
  RASPBERRY = 'RASPBERRY',
  ARDUINO = 'ARDUINO',
  ESP8266 = 'ESP8266'
}

export const createBoard = (config: {}): Promise<BoardType> => new Promise(
  (resolve, reject) => {
    const board = new five.Board({ ...config, repl: false });
    board.on('ready', () => resolve(board))
    board.on('error', () => reject('Error on init board'))
  }
);

export const createBoards = async (pubnub: any): Promise<Array<BoardType>> => {
  const boards = await Board.find({});
  const connectedBoards = [];
  for (const board of boards) {
    const {_id, port, type, host} = board;
    try {
      let config = { id: _id, port };
      if (type === BoardsEnum.ESP8266) {
        config = { id: _id, port: new EtherPortClient({ host, port: 3030 }) }
      }
      const connectedBoard = await createBoard(config)
      const disconnectCallback = async () => {
        publishMessage(pubnub, 'local:board', { id: _id })
        await Board.findOneAndUpdate({ _id }, { connected: false });
      }
      connectedBoard.on('exit', disconnectCallback)
      connectedBoard.on('close', disconnectCallback)
      connectedBoards.push(connectedBoard);
      await Board.findOneAndUpdate({ _id }, { connected: true });
    } catch (e) {
      console.log(`error when connecting board ${_id}`)
      await Board.findOneAndUpdate({ _id }, { connected: false });
    }
  }
  return connectedBoards;
}

export const initBoards = async (pubnub) => {
  const boards = await createBoards(pubnub);
  const boardsWithPins = [];
  for (const board of boards) {
    const pins = await initIO(board);
    boardsWithPins.push({ ...board, pins });
  }
  return boardsWithPins;

}
