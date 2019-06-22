"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardIo = exports.BoardIoEnum = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BoardIoEnum;
exports.BoardIoEnum = BoardIoEnum;

(function (BoardIoEnum) {
  BoardIoEnum["RELAY"] = "RELAY";
})(BoardIoEnum || (exports.BoardIoEnum = BoardIoEnum = {}));

var schema = new _mongoose["default"].Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  type: {
    type: String,
    required: true,
    "enum": Object.keys(BoardIoEnum)
  },
  pin: {
    type: String,
    required: true
  },
  board: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Board'
  },
  room: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Room'
  },
  state: {
    type: Boolean,
    "default": false
  },
  createdBy: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

var BoardIo = _mongoose["default"].model('boardIo', schema);

exports.BoardIo = BoardIo;