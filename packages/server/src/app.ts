import Koa from 'koa';
import Router from 'koa-router';
import graphqlHTTP from 'koa-graphql';



const app = new Koa();
const router = new Router();

router.get('/', ctx => ctx.body = 'Hello World')

// router.all('/graphql', graphqlHTTP({
//   schema: MyGraphQLSchema,
//   graphiql: true
// }))

export default app;

app.use(router.routes()).use(router.allowedMethods());
