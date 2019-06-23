"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _QueryType = _interopRequireDefault(require("./QueryType"));

var _MutationType = _interopRequireDefault(require("./MutationType"));

var _SubscriptionType = _interopRequireDefault(require("./SubscriptionType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = new _graphql.GraphQLSchema({
  query: _QueryType["default"],
  mutation: _MutationType["default"],
  subscription: _SubscriptionType["default"]
});

exports["default"] = _default;