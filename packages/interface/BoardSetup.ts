import * as five from 'johnny-five'
import { Board as BoardType } from 'johnny-five'

import { SERIAL_PORT } from '../shared/config'
import { Board } from '../shared/models/BoardModel';
import { initIO } from './IOSetup'

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
      boards.map(({ _id, port}) => ({ id: _id, port }))
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
