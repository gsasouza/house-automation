import { createServer } from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { WebSocketServer } from 'ws'
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import { useServer } from 'graphql-ws/lib/use/ws';
import dotenv from 'dotenv';

dotenv.config();

import schema from "./schema/schema";
import { getDataLoaders } from "./loaders/dataloadersMiddleware";
import { authenticatedMiddleware, getUser } from "./auth";
import { connect } from "./config/db";
import { consume } from "./pubsub/consumer";

const PORT = process.env.PORT;

const app = express();
app.use(authenticatedMiddleware);
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({
      httpServer, async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    }),
  ],
});

(async () => {
  try {
    await connect();
  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }

  await server.start();

  await consume();

  app.use('/graphql', cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware(server, {
    context: async ({ req }) => ({
      dataloaders: getDataLoaders(),
      user: (await getUser(req.headers.authorization)).user
    })
  }));

  httpServer.listen(PORT, () => {
    console.log(`🚀  Server is now running on http://localhost:${PORT}/graphql`);
  });

})()
