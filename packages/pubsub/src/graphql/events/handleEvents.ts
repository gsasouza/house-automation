import { CHANNELS } from '../../pubnub/channels';
import { DeviceChangedState, BoardDisconnect } from './index';

const handleEvents = async ({ channel, message }) => {
  switch (channel) {
    case CHANNELS.LOCAL.DEVICE:
      return DeviceChangedState(message);
    case CHANNELS.LOCAL.BOARD:
      return BoardDisconnect(message);
    default:
      return;
  }
};

export default handleEvents;
