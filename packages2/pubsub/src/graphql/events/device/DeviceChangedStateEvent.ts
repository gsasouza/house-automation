import { Device } from '@housejs/shared';

import { pubSub } from '../../config';
import { EVENTS } from '../events';

export default async ({ id }) => {
  const device = await Device.findOne({ _id: id });
  await pubSub.publish(EVENTS.DEVICE.CHANGED, { BoardIoChanged: { device } });
};
