import { BoardDisconnectEvent, BoardConnectEvent, addListenerToInterfaceSubscriptions } from '@housejs/pubsub';
import { Board, BoardsEnum } from '@housejs/shared';

import pubnub from '../common/pubnub';

import { devicesSetup } from '../device/Setup';

import { EtherPortClient } from 'etherport-client';
import * as five from 'johnny-five';
import { Board as BoardType } from 'johnny-five';

export const createBoard = (config: {}): Promise<BoardType> =>
  new Promise((resolve, reject) => {
    const board = new five.Board({ ...config, repl: false });
    board.on('ready', () => resolve(board));
    board.on('error', () => reject('Error on init board'));
  });

const createESP8266 = async ({ _id, host }) => {
  const config = { id: _id, port: new EtherPortClient({ host: host.trim(), port: 3030 }) };
  const esp8266 = await createBoard(config);
  const disconnectCallback = async () => BoardDisconnectEvent({ pubnub })({ id: _id });
  esp8266.on('exit', disconnectCallback);
  esp8266.on('close', disconnectCallback);
  await BoardConnectEvent({ pubnub })({ id: _id });
  return esp8266;
};

const createBoardByType = async board => {
  const { type } = board;
  switch (type) {
    case BoardsEnum.ESP8266:
      return createESP8266(board);
    default:
      return null;
  }
};

const createBoards = async () => {
  const boards = await Board.find();
  const connectedBoards: BoardType[] = [];
  for (const board of boards) {
    try {
      const createdBoard = await createBoardByType(board);
      if (createdBoard) connectedBoards.push(createdBoard);
    } catch (e) {
      await BoardDisconnectEvent({ pubnub })({ id: board._id });
    }
  }
  return connectedBoards;
};

export const boardsSetup = async () => {
  const boards = await createBoards();
  const boardsWithPins: BoardType[] = [];
  for (const board of boards) {
    const pins = await devicesSetup(board);
    boardsWithPins.push({ ...board, pins });
  }
  addListenerToInterfaceSubscriptions({ pubnub, boards: boardsWithPins });
  return boardsWithPins;
};
