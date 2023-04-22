"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardService = void 0;
const five = __importStar(require("johnny-five"));
const etherport_client_1 = require("etherport-client");
const pinService_1 = require("./pinService");
class BoardService {
    constructor() {
        this.boards = {};
        this.addPin = (host, pinAddress, mode) => {
            const boardConfig = this.boards[host];
            if (!boardConfig)
                return console.error('Placa não encontrada');
            boardConfig.board.pinMode(pinAddress, five.Pin.OUTPUT);
            return boardConfig.pins.createPin(boardConfig.board, pinAddress);
        };
        this.changePinState = (host, pinAddress, state) => {
            const boardConfig = this.boards[host];
            if (!boardConfig)
                return console.error('Placa não encontrada');
            boardConfig.pins.changePinState(pinAddress, state);
        };
        this.disconnectCallback = (host) => () => __awaiter(this, void 0, void 0, function* () {
            this.removeBoard(host);
            // send message to remote server to update board status
        });
        this.createBoard = (host) => __awaiter(this, void 0, void 0, function* () {
            console.log(host);
            try {
                const createdBoard = yield new Promise((resolve, reject) => {
                    const port = new etherport_client_1.EtherPortClient({ host, port: 3030 });
                    const board = new five.Board({ id: host, port, repl: false });
                    board.on('ready', () => {
                        board.on('exit', this.disconnectCallback(host));
                        board.on('close', this.disconnectCallback(host));
                        resolve(board);
                    });
                    board.on('error', (e) => reject('Error on init board'));
                });
                // Call remote server to update board status
                this.boards = Object.assign(Object.assign({}, this.boards), { [host]: { board: createdBoard, pins: new pinService_1.PinService() } });
                console.log('ready');
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    removeBoard(host) {
        this.boards = Object.assign(Object.assign({}, this.boards), { [host]: undefined });
    }
}
exports.boardService = new BoardService();
