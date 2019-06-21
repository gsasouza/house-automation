"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = getUser;
exports.generateToken = generateToken;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _shared = require("@gsasouza/shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getUser(_x) {
  return _getUser.apply(this, arguments);
}

function _getUser() {
  _getUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(token) {
    var decodedToken, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (token) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", {
              user: null
            });

          case 2:
            _context.prev = 2;
            decodedToken = _jsonwebtoken["default"].verify(token.substring(4), _shared.JWT_SECRET);
            _context.next = 6;
            return _shared.User.findOne({
              _id: decodedToken.id
            });

          case 6:
            user = _context.sent;
            return _context.abrupt("return", {
              user: user
            });

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", {
              user: null
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  }));
  return _getUser.apply(this, arguments);
}

function generateToken(user) {
  return "JWT ".concat(_jsonwebtoken["default"].sign({
    id: user._id
  }, _shared.JWT_SECRET));
}