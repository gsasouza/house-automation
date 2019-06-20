import app from './app';
import { connectDatabase, SERVER_PORT } from '@gsasouza/shared';
import http from 'http';
import Socket from 'socket.io';

import { initSocket } from './SocketSetup';
import { initBoards } from './BoardSetup';

const server = http.createServer(app.callback());

const io = Socket(server);

(async () => {
  try {
    await connectDatabase();
    await initSocket(io, await initBoards());
  } catch (error) {
    console.log(error);
    console.error('Unable to connect to database', error);
    process.exit(1);
  }
  server.listen(3000, () => console.log('App running on port 3000'));
})();
