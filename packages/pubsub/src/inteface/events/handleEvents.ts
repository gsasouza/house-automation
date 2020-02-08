import { CHANNELS } from '../../pubnub/channels';
import { DeviceChangeState } from './index';

const handleEvents = ({ pubnub, boards }) => async ({ channel, message }) => {
  switch (channel) {
    case CHANNELS.CLOUD.DEVICE:
      return DeviceChangeState({ pubnub, boards })(message);
    default:
      return;
  }
};

export default handleEvents;
