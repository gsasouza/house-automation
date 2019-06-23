"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koa = _interopRequireDefault(require("koa"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _koaGraphql = _interopRequireDefault(require("koa-graphql"));

var _kcors = _interopRequireDefault(require("kcors"));

var _koaMorgan = _interopRequireDefault(require("koa-morgan"));

var _graphqlPlaygroundMiddlewareKoa = _interopRequireDefault(require("graphql-playground-middleware-koa"));

var _pubSub = require("./pubsub/pubSub");

var _schema = _interopRequireDefault(require("./schema/schema"));

var _auth = require("./auth");

var _dataloadersMiddleware = require("./loaders/dataloadersMiddleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = new _koa["default"]();
var router = new _koaRouter["default"]();
app.context.pubnub = (0, _pubSub.pubNubSetup)();
app.use((0, _koaMorgan["default"])('tiny'));
app.use(_dataloadersMiddleware.dataloadersMiddleware);
app.use(_auth.authenticatedMiddleware);
router.get('/', function (ctx) {
  return ctx.body = 'Hello World';
});
router.all('/playground', (0, _graphqlPlaygroundMiddlewareKoa["default"])({
  endpoint: '/graphql',
  subscriptionEndpoint: "ws://localhost:".concat(process.env.SERVER_PORT, "/subscriptions")
}));
router.all('/graphql', (0, _koaGraphql["default"])({
  schema: _schema["default"],
  graphiql: true
}));
app.use((0, _kcors["default"])());
app.use(router.routes()).use(router.allowedMethods());
var _default = app;
exports["default"] = _default;