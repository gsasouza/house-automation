  import { PubSub } from 'graphql-subscriptions';
import { createPubNubInstance } from '@gsasouza/shared'
import BoardIoChangedEvent from './BoardIoChangedEvent';

const pubSub = new PubSub();

export const EVENTS = {
  BOARD_IO: {
    CHANGED: 'BOARD_IO_ADDED',
  },
};

export const pubNubSetup = () => {
  const pubnub = createPubNubInstance();
  pubnub.addListener({
    message: async ({ message }) => BoardIoChangedEvent(message),
  });
  pubnub.subscribe({
    channels: ['local']
  });
  return pubnub
}

export default pubSub
