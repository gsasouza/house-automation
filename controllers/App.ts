import * as path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import statics from 'koa-static'
import next from 'next';
import http from 'http';
import Socket from 'socket.io'

import { initSocket } from '../interface/SocketSetup';
import { initBoards } from '../interface/BoardSetup';
import { connect } from '../config/db'

// Initialize KoaJs server and router
const app = new Koa();
const server = http.createServer(app.callback())
const router = new Router();
const io = new Socket(server)

// Initialize NextJs instance and expose request handler
const nextApp = next({ dev: true });
const handler = nextApp.getRequestHandler();

app.use(statics(path.join(__dirname, "public")));

const setup = async () => {
  try {
    await connect();
    await initSocket(io, await initBoards());
    await nextApp.prepare();
    router.get('/', async ctx => {
      await nextApp.render(ctx.req, ctx.res, '/Home', ctx.query);
      ctx.respond = false;
    });

    router.get('*', async ctx => {
      await handler(ctx.req, ctx.res);
      ctx.respond = false;
    });

    app.use(router.routes());
    server.listen(3000, () => console.log('App running on port 3000'));
  } catch (e) {
    console.error(e);
    process.exit();
  }
}

export default setup
