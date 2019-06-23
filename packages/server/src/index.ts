import '@babel/polyfill'
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { connectDatabase, SERVER_PORT } from '@gsasouza/shared';
import schema from './schema/schema'

import app from './app';

(async () => {
  try {
    await connectDatabase();
  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }
  const server = createServer(app.callback());
  server.listen(SERVER_PORT, () => {
    console.log(`Server started on port ${SERVER_PORT}`);
    SubscriptionServer.create(
      {
        onConnect: connectionParams => console.log('Client subscription connected!', connectionParams),
        onDisconnect: () => console.log('Client subscription disconnected!'),
        execute,
        subscribe,
        schema,
      },
      {
        server,
        path: '/subscriptions',
      },
    )
  })
})();
