import amqp from 'amqplib';
import { AMQP_URL } from '@gsasouza/shared';

const QUEUE = 'DEFAULT'
console.log(AMQP_URL)

const connect = async () => {
  const connection = await amqp.connect(AMQP_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE, { durable: true });
  console.log(open)
}
connect()
