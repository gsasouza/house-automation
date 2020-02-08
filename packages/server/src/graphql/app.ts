import { subscriptionsSetup } from '@housejs/pubsub';

import { authenticatedMiddleware } from '../common/auth';
import { GRAPHQL_PORT, PUBNUB_CREDENTIALS } from '../common/config';
import { dataloadersMiddleware } from './loaders';
import schema from './schema';

import koaPlayground from 'graphql-playground-middleware-koa';
import cors from 'kcors';
import Koa from 'koa';
import graphqlHTTP from 'koa-graphql';
import morgan from 'koa-morgan';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();
app.context.pubnub = subscriptionsSetup(PUBNUB_CREDENTIALS);

router.get('/', ctx => (ctx.body = 'Hello World'));

app.use(morgan('tiny'));
app.use(cors());
app.use(dataloadersMiddleware);
app.use(authenticatedMiddleware);
app.use(router.routes()).use(router.allowedMethods());

router.all(
  '/playground',
  koaPlayground({
    endpoint: '/graphql',
    subscriptionEndpoint: `ws://localhost:${GRAPHQL_PORT}/subscriptions`,
  }),
);

router.all(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: false,
  }),
);

export default app;
