import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import {boardService} from "./src/services/boardService";
import {kafkaService} from "./src/services/KafkaSerive";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json())

kafkaService.consume(async ({topic, partition, message}) => {
    const board = JSON.parse(message.value.toString())
    console.log(board)
    await boardService.createBoard(board.host);
    for (const pin of board.pins) {
        boardService.addPin(board.host, pin.pinAddress, pin.type)
    }
});

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.post('/change-pin', (req: Request, res: Response) => {
    boardService.changePinState(req.body.host, req.body.pin, req.body.status === 'true');
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

