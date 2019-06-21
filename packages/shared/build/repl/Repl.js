"use strict";

var _repl = _interopRequireDefault(require("repl"));

var _db = require("../config/db");

var _UserModel = require("../models/UserModel");

var _BoardModel = require("../models/BoardModel");

var _BoardIOModel = require("../models/BoardIOModel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var repl;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _db.connect)();

        case 3:
          repl = _repl["default"].start('house::automation> ');
          repl.context.User = _UserModel.User;
          repl.context.Board = _BoardModel.Board;
          repl.context.BoardIO = _BoardIOModel.BoardIO;
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error('Unable to connect to database');
          process.exit(1);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 9]]);
}))();