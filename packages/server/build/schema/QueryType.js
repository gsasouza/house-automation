"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _graphqlRelay = require("graphql-relay");

var _NodeInterface = require("../interface/NodeInterface");

var _UserConnection = _interopRequireDefault(require("../modules/user/UserConnection"));

var UserLoader = _interopRequireWildcard(require("../modules/user/UserLoader"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = new _graphql.GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: function fields() {
    return {
      node: _NodeInterface.NodeField,
      users: {
        type: _UserConnection["default"].connectionType,
        args: _objectSpread({}, _graphqlRelay.connectionArgs, {
          search: {
            type: _graphql.GraphQLString
          }
        }),
        resolve: function resolve(_, args, context) {
          return UserLoader.loadUsers(context, args);
        }
      }
    };
  }
});

exports["default"] = _default;