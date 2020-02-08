import { IBoard, IDevice } from '@housejs/shared';

import { CHANNELS } from '../pubnub/channels';
import { publishMessage } from '../pubnub/config';

const compareObjectId = (idA, idB) => idA.toString() === idB.toString();

interface IPin {
  on: () => void;
  off: () => void;
}

interface IInterfaceBoard extends IBoard {
  pins: {
    [id: string]: IPin;
  };
}

export const findDevicePinInBoards = (boards: IInterfaceBoard[], device: IDevice) => {
  const deviceBoard = boards.find(board => compareObjectId(board.id, device.board));
  if (!deviceBoard) return null;
  const { pins } = deviceBoard;
  const devicePin = pins[device._id.toString()];
  if (!devicePin) return null;
  return devicePin;
};

export const MESSAGE_TYPES = {
  BOARD: 'BOARD',
  DEVICE: 'DEVICE',
};

export const replyStateChange = (pubnub, { _id }, type) => {
  switch (type) {
    case MESSAGE_TYPES.BOARD:
      return publishMessage(pubnub, CHANNELS.LOCAL.BOARD, { id: _id });
    case MESSAGE_TYPES.DEVICE:
      return publishMessage(pubnub, CHANNELS.LOCAL.DEVICE, { id: _id });
    default:
      return;
  }
};
