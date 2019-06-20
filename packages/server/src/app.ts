import Koa from 'koa';
import Router from 'koa-router';
import graphqlHTTP from 'koa-graphql';

import koaPlayground from 'graphql-playground-middleware-koa';

import schema from './schema/schema';

const app = new Koa();
const router = new Router();

router.get('/', ctx => ctx.body = 'Hello World')

router.all('/playground', koaPlayground({ endpoint: '/graphql' }))

router.all('/graphql', graphqlHTTP({
  schema,
  graphiql: false
}))

export default app;

app.use(router.routes()).use(router.allowedMethods());
