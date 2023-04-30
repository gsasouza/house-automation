"use strict";
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
exports.EventService = void 0;
const KafkaSerive_1 = require("./KafkaSerive");
const BoardService_1 = require("./BoardService");
const events_1 = require("../consts/events");
class EventService {
    constructor() {
        this.onMessage = ({ topic, partition, message: rawMessage }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            console.log(topic, partition, (_a = rawMessage.value) === null || _a === void 0 ? void 0 : _a.toString());
            const message = JSON.parse((_c = (_b = rawMessage.value) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : '');
            const { event } = message;
            switch (event) {
                case events_1.EVENTS.BOARD_IO.ADD: {
                    const { board, type, pin, mode } = message;
                    yield BoardService_1.boardService.addPin(board, pin, type, mode);
                    break;
                }
                case events_1.EVENTS.BOARD_IO.REMOVE:
                    break;
                case events_1.EVENTS.BOARD_IO.CHANGED:
                    const { board, state, pin } = message;
                    yield BoardService_1.boardService.changePinState(board, pin, state);
                    break;
                case events_1.EVENTS.BOARD.ADD: {
                    const { id, host, port } = message;
                    yield BoardService_1.boardService.createBoard(id, host, port);
                    // send added message to board
                    break;
                }
                case events_1.EVENTS.BOARD.REMOVE:
                    break;
                case events_1.EVENTS.BOARD.CHANGED:
                    break;
            }
        });
        KafkaSerive_1.kafkaService.consume(this.onMessage);
    }
}
exports.EventService = EventService;
