import { EachMessageHandler } from "kafkajs";
import { EVENTS, kafka, publish, publishBatch } from "./pubSub";
import { BoardIo } from "../modules/boardIo/BoardIOModel";
import { Board } from "../modules/board/BoardModel";
import { User } from "../modules/user/UserModel";
import { fromGlobalId } from "graphql-relay";
import BoardIoChangedEvent from "./BoardIoChangedEvent";

const consumer = kafka.consumer({ groupId: 'remote-server' });

const onMessage: EachMessageHandler = async ({ topic, partition, message: rawMessage }) => {

  const message = JSON.parse(rawMessage.value?.toString() ?? '')
  const { event } = message;

  switch (event) {
    case EVENTS.BOARD.CONNECTED: {
      const { id, connected } = message as ConnectedBoardMessage;
      await Board.updateOne({ _id: id }, { connected });
      break;
    }

    case EVENTS.BOARD.INIT: {
      const { user: username } = message as InitBoardMessage;
      const user = await User.findOne({ username });

      const board = await Board.findOne({ createdBy: user._id });
      if (!board) return;
      const boardIos = await BoardIo.find({ board: board._id });

      const orderId = new Date().getTime();
      await publishBatch(username, [
        {
          key: orderId.toString(),
          value: JSON.stringify({
            event: EVENTS.BOARD.ADD,
            id: board._id,
            type: board.type,
            port: board.port,
            host: board.host,
          })
        },
        ...boardIos.map((boardIo, index) => ({
          key: (orderId + index).toString(),
          value: JSON.stringify({
            event: EVENTS.BOARD_IO.ADD,
            id: boardIo._id,
            type: boardIo.type,
            pin: boardIo.pin,
            board: board._id
          })
        }))
      ])
      break;
    }

    case EVENTS.BOARD_IO.CHANGED: {
      const { pin, board, state } = message as ChangedBoardIOMessage;
      await BoardIo.updateOne({ board, pin }, { state });
      await BoardIoChangedEvent({ pin, board })
      break;
    }
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

type InitBoardMessage = {
  event: string;
  user: string;
}

type ConnectedBoardIOMessage = {
  event: string;
  pin: string;
  board: string;
  connected: boolean;
}

type ChangedBoardIOMessage = {
  event: string;
  pin: string;
  board: string;
  state: boolean;
}

