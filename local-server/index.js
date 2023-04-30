"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const BoardService_1 = require("./src/services/BoardService");
const EventService_1 = require("./src/services/EventService");
const app = (0, express_1.default)();
const port = process.env.PORT;
new EventService_1.EventService();
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.post('/change-pin', (req, res) => {
    BoardService_1.boardService.changePinState(req.body.host, req.body.pin, req.body.status === 'true');
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
