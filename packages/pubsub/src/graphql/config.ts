import { CHANNELS } from '../pubnub/channels';
import { createPubNubInstance, PubNubCredentials } from '../pubnub/config';
import handleEvents from './events/handleEvents';

import { PubSub } from 'graphql-subscriptions';

export const pubSub = new PubSub();

type SetupArgs = PubNubCredentials;

export const subscriptionsSetup = (args: SetupArgs) => {
  const pubnub = createPubNubInstance(args);
  pubnub.addListener({ message: handleEvents });

  pubnub.subscribe({
    channels: Object.values(CHANNELS.LOCAL),
  });
  return pubnub;
};
