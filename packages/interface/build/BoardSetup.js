"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initBoards = exports.createBoards = exports.createBoard = exports.BoardsEnum = void 0;

var five = _interopRequireWildcard(require("johnny-five"));

var _etherportClient = require("etherport-client");

var _shared = require("@gsasouza/shared");

var _IOSetup = require("./IOSetup");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BoardsEnum;
exports.BoardsEnum = BoardsEnum;

(function (BoardsEnum) {
  BoardsEnum["RASPBERRY"] = "RASPBERRY";
  BoardsEnum["ARDUINO"] = "ARDUINO";
  BoardsEnum["ESP8266"] = "ESP8266";
})(BoardsEnum || (exports.BoardsEnum = BoardsEnum = {}));

var configDefault = _shared.SERIAL_PORT ? {
  port: _shared.SERIAL_PORT
} : {};

var createBoard = function createBoard() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : configDefault;
  return new Promise(function (resolve, reject) {
    var board = new five.Board(_objectSpread({}, config, {
      repl: false
    }));
    board.on('ready', function () {
      return resolve(board);
    });
    board.on('fail', function () {
      return reject('Failed to init board');
    });
  });
};

exports.createBoard = createBoard;

var createBoards =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var boards;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _shared.Board.find({});

          case 2:
            boards = _context.sent;
            return _context.abrupt("return", new Promise(function (resolve) {
              new five.Boards(boards.map(function (_ref2) {
                var _id = _ref2._id,
                    port = _ref2.port,
                    type = _ref2.type;

                if (type === BoardsEnum.ESP8266) {
                  return {
                    id: _id,
                    port: new _etherportClient.EtherPortClient({
                      host: '192.168.15.23',
                      port: 3030
                    })
                  };
                }

                return {
                  id: _id,
                  port: port
                };
              })).on('ready', function () {
                resolve(Array.from(this));
              });
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createBoards() {
    return _ref.apply(this, arguments);
  };
}();

exports.createBoards = createBoards;

var initBoards =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var boards, boardsWithPins, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, board, pins;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return createBoards();

          case 2:
            boards = _context2.sent;
            boardsWithPins = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 7;
            _iterator = boards[Symbol.iterator]();

          case 9:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 18;
              break;
            }

            board = _step.value;
            _context2.next = 13;
            return (0, _IOSetup.initIO)(board);

          case 13:
            pins = _context2.sent;
            boardsWithPins.push(_objectSpread({}, board, {
              pins: pins
            }));

          case 15:
            _iteratorNormalCompletion = true;
            _context2.next = 9;
            break;

          case 18:
            _context2.next = 24;
            break;

          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2["catch"](7);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 24:
            _context2.prev = 24;
            _context2.prev = 25;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 27:
            _context2.prev = 27;

            if (!_didIteratorError) {
              _context2.next = 30;
              break;
            }

            throw _iteratorError;

          case 30:
            return _context2.finish(27);

          case 31:
            return _context2.finish(24);

          case 32:
            return _context2.abrupt("return", boardsWithPins);

          case 33:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[7, 20, 24, 32], [25,, 27, 31]]);
  }));

  return function initBoards() {
    return _ref3.apply(this, arguments);
  };
}();

exports.initBoards = initBoards;