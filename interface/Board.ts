import five from 'johnny-five'
import { SERIAL_PORT } from '../config'
import setup from './IOSetup';

const config = SERIAL_PORT ? { port: SERIAL_PORT } : {}

const board = new five.Board({ ...config, repl: false });

const initBoard = (callback) => {
  board.on('ready', async () => {
    const pins = await setup();
    await callback({ pins });
  })
}

export default initBoard
