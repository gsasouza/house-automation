import { PubSub } from 'graphql-subscriptions';
import { Kafka, Message } from "kafkajs";

const pubSub = new PubSub();

export const kafka = new Kafka({
  clientId: 'kafka-producer',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer({
  retry: { retries: 8, initialRetryTime: 1, maxRetryTime: 30000, },
  connectionTimeout: 10000,
  authenticationTimeout: 10000,
});

export const EVENTS = {
  BOARD_IO: {
    ADD: 'BOARD_IO_ADD',
    REMOVE: 'BOARD_IO_REMOVE',
    CHANGED: 'BOARD_IO_CHANGED',
    CONNECTED: 'BOARD_CONNECTED',
  },
  BOARD: {
    ADD: 'BOARD_ADD',
    REMOVE: 'BOARD_REMOVE',
    CHANGED: 'BOARD_CHANGED',
    CONNECTED: 'BOARD_CONNECTED',
    INIT: 'BOARD_INIT',
  }
};

export const publish = async (user: string, message: Record<string, unknown>) => {
  return publishBatch(user, [{ value: JSON.stringify(message) }]);
}

export const publishBatch = async (user: string, messages: Message[]) => {

  try {
    await producer.connect()

    const response = await producer.send({
      topic: user,
      messages,
    });

    // console.log(response)

    await producer.disconnect();
  } catch (e) {
    console.log(e)
  }

}

export default pubSub
