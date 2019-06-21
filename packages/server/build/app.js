"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koa = _interopRequireDefault(require("koa"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _koaGraphql = _interopRequireDefault(require("koa-graphql"));

var _kcors = _interopRequireDefault(require("kcors"));

var _graphqlPlaygroundMiddlewareKoa = _interopRequireDefault(require("graphql-playground-middleware-koa"));

var _schema = _interopRequireDefault(require("./schema/schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = new _koa["default"]();
var router = new _koaRouter["default"]();
router.get('/', function (ctx) {
  return ctx.body = 'Hello World';
});
router.all('/playground', (0, _graphqlPlaygroundMiddlewareKoa["default"])({
  endpoint: '/graphql'
}));
router.all('/graphql', (0, _koaGraphql["default"])({
  schema: _schema["default"],
  graphiql: false
}));
app.use((0, _kcors["default"])());
var _default = app;
exports["default"] = _default;
app.use(router.routes()).use(router.allowedMethods());