"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Board = exports.BoardsEnum = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BoardsEnum;
exports.BoardsEnum = BoardsEnum;

(function (BoardsEnum) {
  BoardsEnum["RASPBERRY"] = "RASPBERRY";
  BoardsEnum["ARDUINO"] = "ARDUINO";
  BoardsEnum["ESP8266"] = "ESP8266";
})(BoardsEnum || (exports.BoardsEnum = BoardsEnum = {}));

var schema = new _mongoose["default"].Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  type: {
    type: String,
    required: true,
    "enum": Object.keys(BoardsEnum)
  },
  host: {
    type: String,
    unique: true
  },
  port: {
    type: String,
    unique: true
  },
  createdBy: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

var Board = _mongoose["default"].model('board', schema);

exports.Board = Board;