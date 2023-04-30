import { EachMessageHandler } from "kafkajs";
import { EVENTS, kafka } from "./pubSub";
import { BoardIo } from "../modules/boardIo/BoardIOModel";
import { Board } from "../modules/board/BoardModel";

const consumer = kafka.consumer({ groupId: 'remote-server' });

const onMessage: EachMessageHandler = async ({ topic, partition, message: rawMessage }) => {

  const message = JSON.parse(rawMessage.value?.toString() ?? '')
  const { event } = message;
  console.log(message)
  switch (event) {
    case EVENTS.BOARD.CONNECTED: {
      const { id, connected } = message as ConnectedBoardMessage;
      await Board.updateOne({ _id: id }, { connected });
      break;
    }

    case EVENTS.BOARD_IO.CHANGED:
      break;
    case EVENTS.BOARD_IO.CONNECTED: {
      const { pin, board, connected } = message as ConnectedBoardIOMessage;
      await BoardIo.updateOne({ board, pin }, { connected });
      break;
    }
  }
}

export const consume = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: 'remote-server', fromBeginning: false })
  await consumer.run({
    eachMessage: onMessage,
  })
}

type ConnectedBoardMessage = {
  event: string;
  id: string;
  connected: boolean;
}

type ConnectedBoardIOMessage = {
  event: string;
  pin: string;
  board: string;
  connected: boolean;
}
