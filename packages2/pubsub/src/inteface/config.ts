import { CHANNELS } from '../pubnub/channels';
import { createPubNubInstance, PubNubCredentials } from '../pubnub/config';
import handleEvents from './events/handleEvents';

type SetupArgs = {
  boards: any;
} & PubNubCredentials;

export const interfaceSubscriptionsSetup = async ({ boards, ...credentials }: SetupArgs) => {
  const pubnub = createPubNubInstance(credentials);

  pubnub.addListener({ message: handleEvents(pubnub, boards) });

  await pubnub.subscribe({
    channels: Object.values(CHANNELS.CLOUD),
    userVisibleOnly: false,
  });
};
