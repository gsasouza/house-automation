import { CHANNELS } from '../pubnub/channels';
import { createPubNubInstance, PubNubCredentials } from '../pubnub/config';
import handleEvents from './events/handleEvents';

import { PubSub } from 'graphql-subscriptions';

export const pubSub = new PubSub();

type SetupArgs = PubNubCredentials;

export const subscriptionsSetup = async (args: SetupArgs) => {
  const pubnub = createPubNubInstance(args);
  pubnub.addListener({ message: handleEvents });
  await pubnub.subscribe({
    channels: Object.values(CHANNELS.LOCAL),
    userVisibleOnly: false,
  });
  return pubnub;
};
