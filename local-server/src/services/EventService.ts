import { EachMessageHandler } from "kafkajs";
import { kafkaService } from "./KafkaSerive";
import { boardService } from "./BoardService";
import { EVENTS } from "../consts/events";


export class EventService {

  constructor() {
    kafkaService.consume(this.onMessage);
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
      case EVENTS.BOARD_IO.CHANGED: {

        const { board, state, pin } = message as ChangedPinMessage;
        boardService.changePinState(board, pin, state)
        console.log('here')
        await kafkaService.publish({ event: EVENTS.BOARD_IO.CHANGED, board, state, pin })
        break;
      }
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
