import 'core-js';
import { createServer } from 'http';

import { connectDatabase } from '@housejs/shared';

import { GRAPHQL_PORT, MONGO_URL } from './common/config';
import app from './graphql/app';
import schema from './graphql/schema';

import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

(async () => {
  try {
    await connectDatabase(MONGO_URL);
  } catch (error) {
    console.error('Could not connect to database', { error }); // eslint-disable-line no-console
    process.exit(1);
  }
  const server = createServer(app.callback());

  server.listen(GRAPHQL_PORT, () => {
    console.log(`Server started on port ${GRAPHQL_PORT}`); // eslint-disable-line no-console
    SubscriptionServer.create(
      {
        onConnect: connectionParams => console.log('Client subscription connected!', connectionParams), // eslint-disable-line no-console
        onDisconnect: () => console.log('Client subscription disconnected!'), // eslint-disable-line no-console
        execute,
        subscribe,
        schema,
      },
      {
        server,
        path: '/subscriptions',
      },
    );
  });
})();
