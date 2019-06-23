import { PubSub } from 'graphql-subscriptions';
import { createPubNubInstance } from '@gsasouza/shared'
import BoardIoChangedEvent from './BoardIoChangedEvent';
import BoardDisconnectedEvent from './BoardDisconnectedEvent'

const pubSub = new PubSub();

export const EVENTS = {
  BOARD_IO: {
    CHANGED: 'BOARD_IO_CHANGED',
  },
};

export const pubNubSetup = () => {
  const pubnub = createPubNubInstance();
  pubnub.addListener({
    message: async ({ channel, message }) => {
      switch (channel) {
        case 'local:board_io': return BoardIoChangedEvent(message)
        case 'local:board': return BoardDisconnectedEvent(message);
      }

    },
  });
  pubnub.subscribe({
    channels: ['local:board_io', 'local:board']
  });
  return pubnub
}

export default pubSub
