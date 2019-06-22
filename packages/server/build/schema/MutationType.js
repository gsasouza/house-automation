"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _mutations = _interopRequireDefault(require("../modules/user/mutations"));

var _mutations2 = _interopRequireDefault(require("../modules/room/mutations"));

var _mutations3 = _interopRequireDefault(require("../modules/board/mutations"));

var _mutations4 = _interopRequireDefault(require("../modules/boardIo/mutations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: function fields() {
    return _objectSpread({}, _mutations["default"], _mutations2["default"], _mutations3["default"], _mutations4["default"]);
  }
});

exports["default"] = _default;