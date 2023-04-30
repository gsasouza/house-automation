import { EachMessageHandler } from "kafkajs";
import { KafkaService } from "./KafkaSerive";
import { boardService } from "./BoardService";

export const EVENTS = {
  BOARD_IO: {
    ADD: 'BOARD_IO_ADD',
    REMOVE: 'BOARD_IO_REMOVE',
    CHANGED: 'BOARD_IO_CHANGED',
  },
  BOARD: {
    ADD: 'BOARD_ADD',
    REMOVE: 'BOARD_REMOVE',
    CHANGED: 'BOARD_CHANGED',
  }
};

export class EventService {

  constructor() {
    new KafkaService().consume(this.onMessage);
  }

  onMessage: EachMessageHandler = async ({topic, partition, message: rawMessage}) => {
    console.log(topic, partition, rawMessage.value?.toString());
    const message = JSON.parse(rawMessage.value?.toString() ?? '')
    const { event } = message;
    switch (event) {
      case EVENTS.BOARD_IO.ADD: {
        const { board, type, pin, mode } = message as AddPinMessage;
        await boardService.addPin(board, pin, type, mode);
        break;
      }
      case EVENTS.BOARD_IO.REMOVE:
        break;
      case EVENTS.BOARD_IO.CHANGED:
        const { board, state, pin } = message as ChangedPinMessage;
        await boardService.changePinState(board, pin, state)
        break;
      case EVENTS.BOARD.ADD: {
        const { id, host, port } = message as AddBoardMessage;
        await boardService.createBoard(id, host, port);
        // send added message to board
        break;
      }
      case EVENTS.BOARD.REMOVE:
        break;
      case EVENTS.BOARD.CHANGED:
        break;
    }
  }
}

type AddBoardMessage = {
  event: string;
  id: string;
  type: string;
  host: string;
  port: string;
}

type AddPinMessage = {
  event: string;
  id: string;
  type: string;
  pin: number;
  board: string;
  mode: number;
}

type ChangedPinMessage = {
  event: string;
  board: string;
  pin: string;
  state: boolean;
}
