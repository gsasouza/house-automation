"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initIO = exports.BoardIOEnum = void 0;

var _johnnyFive = _interopRequireDefault(require("johnny-five"));

var _shared = require("@gsasouza/shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var BoardIOEnum;
exports.BoardIOEnum = BoardIOEnum;

(function (BoardIOEnum) {
  BoardIOEnum["RELAY"] = "RELAY";
})(BoardIOEnum || (exports.BoardIOEnum = BoardIOEnum = {}));

var initIO =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(board) {
    var ios;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _shared.BoardIo.find({
              board: board.id
            });

          case 2:
            ios = _context.sent;
            return _context.abrupt("return", ios.reduce(function (acc, _ref2) {
              var _id = _ref2._id,
                  type = _ref2.type,
                  pin = _ref2.pin,
                  state = _ref2.state;

              //@TODO add more IO types
              switch (type) {
                case BoardIOEnum.RELAY:
                  {
                    var relay = new _johnnyFive["default"].Relay({
                      pin: pin,
                      type: 'NC',
                      board: board
                    });
                    if (state) relay.on();else relay.off();
                    return _objectSpread({}, acc, _defineProperty({}, _id, relay));
                  }

                default:
                  return acc;
              }
            }, {}));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function initIO(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.initIO = initIO;