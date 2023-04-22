import * as five from 'johnny-five'
import {Board, Board as BoardType} from 'johnny-five'
//@ts-ignore
import {EtherPortClient} from 'etherport-client';
import {PinService} from "./pinService";

type BoardWithPins = { board: Board, pins: PinService }

class BoardService {
    private boards: Record<string, BoardWithPins | undefined> = {}

    constructor() {}

    addPin = (host: string, pinAddress: number, mode: number) => {
        const boardConfig = this.boards[host]
        if (!boardConfig) return console.error('Placa não encontrada');
        boardConfig.board.pinMode(pinAddress, five.Pin.OUTPUT);
        return boardConfig.pins.createPin(boardConfig.board, pinAddress);
    }
    changePinState = (host: string, pinAddress: string, state: boolean) => {
        const boardConfig = this.boards[host]
        if (!boardConfig) return console.error('Placa não encontrada');
        boardConfig.pins.changePinState(pinAddress, state);
    }

    removeBoard(host: string) {
        this.boards = {...this.boards, [host]: undefined}
    }

    disconnectCallback = (host: string) => async () => {
        this.removeBoard(host)
        // send message to remote server to update board status
    }

    createBoard = async (host: string): Promise<BoardType> => {
        console.log(host)
        try {
            const createdBoard: BoardType = await new Promise((resolve, reject) => {
                const port = new EtherPortClient({host, port: 3030})
                const board = new five.Board({id: host, port, repl: false});
                board.on('ready', () => {
                    board.on('exit', this.disconnectCallback(host))
                    board.on('close', this.disconnectCallback(host))
                    resolve(board)
                })
                board.on('error', (e) => reject('Error on init board'))
            })
            // Call remote server to update board status
            this.boards = {...this.boards, [host]: {board: createdBoard, pins: new PinService()}}
            console.log('ready');
        } catch (e) {
            console.error(e)
        }
    }
}

export const boardService = new BoardService();