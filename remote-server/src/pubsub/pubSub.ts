import { PubSub } from 'graphql-subscriptions';
import { Kafka, Message } from "kafkajs";

const pubSub = new PubSub();


export const kafka = new Kafka({
  clientId: 'kafka-producer',
  brokers: ['pkc-ldjyd.southamerica-east1.gcp.confluent.cloud:9092'],
  requestTimeout: 45000,
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: 'C4FHFR72R5VESF6F',
    password: 'l0UwjHKaHCu8mZkS8+S5mf0itepSNjaLfB+z98G5OjDXfFVCQZJTVeg/LbuKmAH3',
  },
});

// const producer = new Kafka2.Producer({
//   'bootstrap.servers': 'pkc-ldjyd.southamerica-east1.gcp.confluent.cloud:9092',
//   'security.protocol': 'sasl_ssl',
//   'sasl.mechanisms': 'PLAIN',
//   'sasl.username' : 'C4FHFR72R5VESF6F',
//   'sasl.password': 'l0UwjHKaHCu8mZkS8+S5mf0itepSNjaLfB+z98G5OjDXfFVCQZJTVeg/LbuKmAH3',
//
// });

const producer = kafka.producer({
  retry: { retries: 8, initialRetryTime: 1, maxRetryTime: 30000 },
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
