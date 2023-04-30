import { Kafka, Consumer, Producer, EachMessageHandler } from 'kafkajs'

const ACCOUNT = process.env.ACCOUNT as string;

export class KafkaService {
  private consumer: Consumer
  private producer: Producer

  constructor() {

    const kafka = new Kafka({ clientId: ACCOUNT, brokers: ['localhost:9092'] })
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

      await this.producer.send({
        topic: 'remote-server',
        messages: [
          { value: JSON.stringify(message) },
        ],
      });

      await this.producer.disconnect();
    } catch (e) {
      console.log(e)
    }
  }
}

export const kafkaService = new KafkaService();
