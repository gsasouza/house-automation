import {Kafka, Consumer, Producer, KafkaMessage, EachMessageHandler} from 'kafkajs'

const ACCOUNT = process.env.USERNAME as string;

const kafka = new Kafka({clientId: `${ACCOUNT}-local`, brokers: ['localhost:9092']})

class KafkaService {
    private consumer: Consumer
    private producer: Producer

    constructor() {
        this.consumer = kafka.consumer({groupId: ACCOUNT})
        this.producer = kafka.producer();
    }

    public consume = async (onMessage: EachMessageHandler) => {
        // first, we wait for the client to connect and subscribe to the given topic
        await this.consumer.connect()
        await this.consumer.subscribe({topic: ACCOUNT, fromBeginning: true})
        await this.consumer.run({
            // this function is called every time the consumer gets a new message
            eachMessage: onMessage,
        })
    }
}

export const kafkaService = new KafkaService()
