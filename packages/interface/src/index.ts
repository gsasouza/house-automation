import app from './app';
import { connectDatabase, LOCAL_PORT } from '@gsasouza/shared';
import http from 'http';

import { pubNubSetup } from './PubNubSetup'
import { initBoards } from './BoardSetup';

const server = http.createServer(app.callback());

(async () => {
  try {
    await connectDatabase();
  } catch (error) {
    console.log(error);
    console.error('Unable to connect to database', error);
    process.exit(1);
  }
  pubNubSetup(await initBoards());
  server.listen(LOCAL_PORT, () => console.log('App running on port 3000'));
})();
