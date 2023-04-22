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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const boardService_1 = require("./src/services/boardService");
const KafkaSerive_1 = require("./src/services/KafkaSerive");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
KafkaSerive_1.kafkaService.consume(({ topic, partition, message }) => __awaiter(void 0, void 0, void 0, function* () {
    const board = JSON.parse(message.value.toString());
    console.log(board);
    yield boardService_1.boardService.createBoard(board.host);
    for (const pin of board.pins) {
        boardService_1.boardService.addPin(board.host, pin.pinAddress, pin.type);
    }
}));
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.post('/change-pin', (req, res) => {
    boardService_1.boardService.changePinState(req.body.host, req.body.pin, req.body.status === 'true');
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
