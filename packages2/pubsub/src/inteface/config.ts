import { CHANNELS } from '../pubnub/channels';
import { createPubNubInstance, PubNubCredentials } from '../pubnub/config';
import handleEvents from './events/handleEvents';

type SetupArgs = PubNubCredentials;

export const addListenerToInterfaceSubscriptions = ({ pubnub, boards }) =>
  pubnub.addListener({ message: handleEvents({ pubnub, boards }) });

export const interfaceSubscriptionsSetup = (credentials: SetupArgs) => {
  const pubnub = createPubNubInstance(credentials);
  pubnub.subscribe({
    channels: Object.values(CHANNELS.CLOUD),
  });

  return pubnub;
};
