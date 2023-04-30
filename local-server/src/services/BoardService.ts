import * as five from 'johnny-five'
import { Board, Board as BoardType } from 'johnny-five'
//@ts-ignore
import { EtherPortClient } from 'etherport-client';
import { PinService } from "./PinService";
import { kafkaService } from "./KafkaSerive";
import { EVENTS } from "../consts/events";

type BoardWithPins = { board: Board, pins: PinService }

const ACCOUNT = process.env.ACCOUNT as string;

class BoardService {
  private boards: Record<string, BoardWithPins | undefined> = {}

  constructor() {
    kafkaService.publish({ event: EVENTS.BOARD.INIT, user: ACCOUNT })
  }

  addPin = (board: string, pinAddress: number, type: string, mode: number) => {
    const boardConfig = this.boards[board]
    if (!boardConfig) return console.error('Placa não encontrada');
    boardConfig.board.pinMode(pinAddress, five.Pin.OUTPUT);
    boardConfig.pins.createPin(boardConfig.board, pinAddress);

    return kafkaService.publish({ event: EVENTS.BOARD_IO.CONNECTED, board: boardConfig.board.id, pin: pinAddress, connected: true })
  }
  changePinState = (board: string, pinAddress: string, state: boolean) => {
    const boardConfig = this.boards[board]
    if (!boardConfig) return console.error('Placa não encontrada');
    boardConfig.pins.changePinState(pinAddress, state);
  }

  removeBoard(board: string) {
    const boardConfig = this.boards[board];
    this.boards = { ...this.boards, [board]: undefined }
    return boardConfig;
  }

  disconnectCallback = (board: string) => async () => {
    this.removeBoard(board)
    // send message to remote server to update board status
    await kafkaService.publish({ event: EVENTS.BOARD.CONNECTED, id: board, connected: false })
  }

  createBoard = async (id: string, host: string, port: string): Promise<void> => {
    try {
      if (this.boards[id]) return console.error('Placa já conectada');
      const createdBoard: BoardType = await new Promise((resolve, reject) => {
        const board = new five.Board({ id, port: new EtherPortClient({ host, port }), repl: false });
        board.on('ready', () => {
          board.on('exit', this.disconnectCallback(id))
          board.on('close', this.disconnectCallback(id))
          resolve(board)
        })
        board.on('error', (e) => reject('Error on init board'))
      })
      // Call remote server to update board status
      this.boards = { ...this.boards, [id]: { board: createdBoard, pins: new PinService() } }
      await kafkaService.publish({ event: EVENTS.BOARD.CONNECTED, id, connected: true })
      console.log('ready');
    } catch (e) {
      console.error(e)
    }
  }
}

export const boardService = new BoardService();
