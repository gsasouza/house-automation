import Koa from 'koa';
import http from 'http';
import Socket from 'socket.io'

import { initSocket } from './SocketSetup';
import { initBoards } from './BoardSetup';
import { connect } from '../shared/config/db'

// Initialize KoaJs server and router
const app = new Koa();
const server = http.createServer(app.callback())
const io = new Socket(server)

// Initialize NextJs instance and expose request handler

const setup = async () => {
  try {
    await connect();
    await initSocket(io, await initBoards());
    server.listen(3000, () => console.log('App running on port 3000'));
  } catch (e) {
    console.error(e);
    process.exit();
  }
}

export default setup
