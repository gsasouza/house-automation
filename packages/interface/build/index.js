"use strict";

var _app = _interopRequireDefault(require("./app"));

var _shared = require("@gsasouza/shared");

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _SocketSetup = require("./SocketSetup");

var _BoardSetup = require("./BoardSetup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var server = _http["default"].createServer(_app["default"].callback());

var io = (0, _socket["default"])(server);

_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _shared.connectDatabase)();

        case 3:
          _context.t0 = _SocketSetup.initSocket;
          _context.t1 = io;
          _context.next = 7;
          return (0, _BoardSetup.initBoards)();

        case 7:
          _context.t2 = _context.sent;
          _context.next = 10;
          return (0, _context.t0)(_context.t1, _context.t2);

        case 10:
          _context.next = 17;
          break;

        case 12:
          _context.prev = 12;
          _context.t3 = _context["catch"](0);
          console.log(_context.t3);
          console.error('Unable to connect to database', _context.t3);
          process.exit(1);

        case 17:
          server.listen(3000, function () {
            return console.log('App running on port 3000');
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 12]]);
}))();