"use strict";

require("@babel/polyfill");

var _http = require("http");

var _subscriptionsTransportWs = require("subscriptions-transport-ws");

var _graphql = require("graphql");

var _shared = require("@gsasouza/shared");

var _schema = _interopRequireDefault(require("./schema/schema"));

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var server;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _shared.connectDatabase)();

        case 3:
          _context.next = 9;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          console.error('Unable to connect to database');
          process.exit(1);

        case 9:
          server = (0, _http.createServer)(_app["default"].callback());
          server.listen(_shared.SERVER_PORT, function () {
            console.log("Server started on port ".concat(_shared.SERVER_PORT));

            _subscriptionsTransportWs.SubscriptionServer.create({
              onConnect: function onConnect(connectionParams) {
                return console.log('Client subscription connected!', connectionParams);
              },
              onDisconnect: function onDisconnect() {
                return console.log('Client subscription disconnected!');
              },
              execute: _graphql.execute,
              subscribe: _graphql.subscribe,
              schema: _schema["default"]
            }, {
              server: server,
              path: '/subscriptions'
            });
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 5]]);
}))();