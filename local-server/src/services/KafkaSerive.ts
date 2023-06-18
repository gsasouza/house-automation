import { Kafka, Consumer, Producer, EachMessageHandler } from 'kafkajs'

const ACCOUNT = process.env.ACCOUNT as string;

export class KafkaService {
  private consumer: Consumer
  private producer: Producer

  constructor() {

    const kafka = new Kafka({
      clientId: ACCOUNT, brokers: ['pkc-ldjyd.southamerica-east1.gcp.confluent.cloud:9092'],
      requestTimeout: 45000,
      ssl: true,
      sasl: {
        mechanism: 'plain',
        username: 'C4FHFR72R5VESF6F',
        password: 'l0UwjHKaHCu8mZkS8+S5mf0itepSNjaLfB+z98G5OjDXfFVCQZJTVeg/LbuKmAH3',
      },
    })
    this.consumer = kafka.consumer({ groupId: ACCOUNT })
    this.producer = kafka.producer();
  }

  public consume = async (onMessage: EachMessageHandler) => {
    await this.consumer.connect()
    await this.consumer.subscribe({ topic: ACCOUNT, fromBeginning: false })
    await this.consumer.run({
      // this function is called every time the consumer gets a new message
      eachMessage: onMessage,
    })
  }

  public publish = async (message: Record<string, unknown>) => {
    try {
      await this.producer.connect()

      const response = await this.producer.send({
        topic: 'remote-server',
        messages: [
          { value: JSON.stringify(message) },
        ],
      });

      console.log(response)

      await this.producer.disconnect();
    } catch (e) {
      console.log(e)
    }
  }
}

export const kafkaService = new KafkaService();
