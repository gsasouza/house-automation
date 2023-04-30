import * as five from 'johnny-five'
import { Board, Board as BoardType } from 'johnny-five'
//@ts-ignore
import { EtherPortClient } from 'etherport-client';
import { PinService } from "./PinService";

type BoardWithPins = { board: Board, pins: PinService }

class BoardService {
  private boards: Record<string, BoardWithPins | undefined> = {}

  constructor() {
  }

  addPin = (board: string, pinAddress: number, type: string, mode: number) => {
    const boardConfig = this.boards[board]
    if (!boardConfig) return console.error('Placa não encontrada');
    boardConfig.board.pinMode(pinAddress, five.Pin.OUTPUT);
    return boardConfig.pins.createPin(boardConfig.board, pinAddress);
  }
  changePinState = (board: string, pinAddress: string, state: boolean) => {
    const boardConfig = this.boards[board]
    if (!boardConfig) return console.error('Placa não encontrada');
    boardConfig.pins.changePinState(pinAddress, state);
  }

  removeBoard(board: string) {
    this.boards = { ...this.boards, [board]: undefined }
  }

  disconnectCallback = (board: string) => async () => {
    this.removeBoard(board)
    // send message to remote server to update board status
  }

  createBoard = async (id: string, host: string, port: string): Promise<void> => {
    try {
      const createdBoard: BoardType = await new Promise((resolve, reject) => {
        const board = new five.Board({ id, port: new EtherPortClient({ host, port }), repl: false });
        board.on('ready', () => {
          board.on('exit', this.disconnectCallback(host))
          board.on('close', this.disconnectCallback(host))
          resolve(board)
        })
        board.on('error', (e) => reject('Error on init board'))
      })
      // Call remote server to update board status
      this.boards = { ...this.boards, [id]: { board: createdBoard, pins: new PinService() } }
      console.log('ready');
    } catch (e) {
      console.error(e)
    }
  }
}

export const boardService = new BoardService();
