import { PubSub } from 'graphql-subscriptions';
import BoardIoChangedEvent from './BoardIoChangedEvent';
import BoardDisconnectedEvent from './BoardDisconnectedEvent'
import { Kafka } from "kafkajs";

const pubSub = new PubSub();

const kafka = new Kafka({
  clientId: 'kafka-producer',
  brokers: ['localhost:9092'],
});


const producer = kafka.producer();

export const EVENTS = {
  BOARD_IO: {
    ADD: 'BOARD_IO_ADD',
    REMOVE: 'BOARD_IO_REMOVE',
    CHANGED: 'BOARD_IO_CHANGED',
  },
};

export const publish = async (user: string, message: Record<string, unknown>) => {
  await producer.connect()

  await producer.send({
    topic: `${user}`,
    messages: [
      { value: JSON.stringify(message) },
    ],
  });

  await producer.disconnect();
}

export const pubNubSetup = () => {
  // const pubnub = createPubNubInstance();
  // pubnub.addListener({
  //   message: async ({ channel, message }) => {
  //     switch (channel) {
  //       case 'local:board_io': return BoardIoChangedEvent(message)
  //       case 'local:board': return BoardDisconnectedEvent(message);
  //     }
  //
  //   },
  // });
  // pubnub.subscribe({
  //   channels: ['local:board_io', 'local:board']
  // });
  // return pubnub
}

export default pubSub
