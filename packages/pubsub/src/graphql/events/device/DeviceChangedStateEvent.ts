import { Device } from '@housejs/shared';

import { EVENTS } from '../../../events';
import { pubSub } from '../../config';

export default async ({ id }) => {
  const device = await Device.findOne({ _id: id });
  await pubSub.publish(EVENTS.DEVICE.CHANGED, { BoardIoChanged: { device } });
};
