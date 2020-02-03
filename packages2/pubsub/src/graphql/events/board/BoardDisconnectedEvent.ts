import { Device } from '@housejs/shared';

import { pubSub } from '../../config';
import { EVENTS } from '../events';

export default async ({ id }) => {
  const connectedBoardIos = await Device.find({ board: id });
  for (const boardIo of connectedBoardIos) {
    await pubSub.publish(EVENTS.DEVICE.CHANGED, { BoardIoChanged: { boardIo, connected: false } });
  }
};
