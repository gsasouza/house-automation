import app from './app';
import { connectDatabase, LOCAL_PORT, createPubNubInstance } from '@gsasouza/shared';
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
  const pubnub = createPubNubInstance();
  pubNubSetup(pubnub, await initBoards(pubnub));
  server.listen(LOCAL_PORT, () => console.log('App running on port 3000'));
})();
