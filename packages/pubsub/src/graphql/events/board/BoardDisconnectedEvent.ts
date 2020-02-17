import { Device } from '@housejs/shared';

import { EVENTS } from '../../../events';
import { pubSub } from '../../config';

export default async ({ id }) => {
  const connectedBoardIos = await Device.find({ board: id });
  for (const boardIo of connectedBoardIos) {
    await pubSub.publish(EVENTS.DEVICE.CHANGED, { BoardIoChanged: { boardIo, connected: false } });
  }
};
