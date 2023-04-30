import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";

dotenv.config();

import { boardService } from "./src/services/BoardService";
import { EventService } from "./src/services/EventService";

const app: Express = express();
const port = process.env.PORT;

new EventService();

app.use(bodyParser.json())

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

