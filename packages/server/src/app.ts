import Koa from 'koa';
import Router from 'koa-router';
import graphqlHTTP from 'koa-graphql';
import cors from 'kcors';
import morgan from 'koa-morgan'
import koaPlayground from 'graphql-playground-middleware-koa';

import schema from './schema/schema';
import { authenticatedMiddleware } from './auth';
import { dataloadersMiddleware } from './loaders/dataloadersMiddleware';

const app = new Koa();
const router = new Router();

app.use(morgan('tiny'))
app.use(dataloadersMiddleware)
app.use(authenticatedMiddleware)
router.get('/', ctx => ctx.body = 'Hello World')

router.all('/playground', koaPlayground({ endpoint: '/graphql' }))

router.all('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.use(cors());
export default app;

app.use(router.routes()).use(router.allowedMethods());
