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

export const replyStateChange = (pubnub, device) => publishMessage(pubnub, CHANNELS.LOCAL.DEVICE, { id: device._id });
