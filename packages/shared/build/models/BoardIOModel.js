"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardIO = exports.BoardIOEnum = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BoardIOEnum;
exports.BoardIOEnum = BoardIOEnum;

(function (BoardIOEnum) {
  BoardIOEnum["RELAY"] = "RELAY";
})(BoardIOEnum || (exports.BoardIOEnum = BoardIOEnum = {}));

var schema = new _mongoose["default"].Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  type: {
    type: String,
    required: true,
    "enum": Object.keys(BoardIOEnum)
  },
  pin: {
    type: String,
    required: true
  },
  board: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Board'
  },
  createdBy: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

var BoardIO = _mongoose["default"].model('boardIO', schema);

exports.BoardIO = BoardIO;