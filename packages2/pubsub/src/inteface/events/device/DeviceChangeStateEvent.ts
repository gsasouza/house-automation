import { Device } from '@housejs/shared';

import { findDevicePinInBoards, replyStateChange, MESSAGE_TYPES } from '../../utils';

export default ({ boards, pubnub }) => async ({ id, state }) => {
  try {
    const device = await Device.findOne({ _id: id });
    if (!device) return;
    const devicePin = findDevicePinInBoards(boards, device);
    if (!devicePin) return;
    if (state) devicePin.on();
    else devicePin.off();
    await Device.findOneAndUpdate({ _id: id }, { state }, { new: true });
    return replyStateChange(pubnub, device, MESSAGE_TYPES.DEVICE);
  } catch (e) {
    console.log(e); //eslint-disable-line no-console
    return;
  }
};
