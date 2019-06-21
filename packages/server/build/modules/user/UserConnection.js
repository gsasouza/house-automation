"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _graphqlRelay = require("graphql-relay");

var _UserType = _interopRequireDefault(require("./UserType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'User',
  nodeType: _UserType["default"],
  connectionFields: {
    count: {
      type: _graphql.GraphQLInt
    }
  }
});

exports["default"] = _default;