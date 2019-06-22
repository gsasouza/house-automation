"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _graphqlRelay = require("graphql-relay");

var _NodeInterface = require("../../schema/NodeInterface");

var UserType = new _graphql.GraphQLObjectType({
  name: 'User',
  description: 'User data',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('User'),
      _id: {
        type: _graphql.GraphQLString,
        resolve: function resolve(user) {
          return user._id;
        }
      },
      name: {
        type: _graphql.GraphQLString,
        resolve: function resolve(user) {
          return user.name;
        }
      },
      isAdmin: {
        type: _graphql.GraphQLBoolean,
        resolve: function resolve(user) {
          return user.isAdmin;
        }
      },
      username: {
        type: _graphql.GraphQLString,
        resolve: function resolve(user) {
          return user.username;
        }
      }
    };
  },
  interfaces: function interfaces() {
    return [_NodeInterface.NodeInterface];
  }
});
var _default = UserType;
exports["default"] = _default;