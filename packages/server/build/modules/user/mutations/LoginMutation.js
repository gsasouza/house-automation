"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _graphqlRelay = require("graphql-relay");

var _shared = require("@gsasouza/shared");

var _auth = require("../../../auth");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'Login',
  inputFields: {
    username: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    },
    password: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    }
  },
  mutateAndGetPayload: function () {
    var _mutateAndGetPayload = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref) {
      var username, password, user, correctPassword;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              username = _ref.username, password = _ref.password;
              _context.next = 3;
              return _shared.User.findOne({
                username: username.toLowerCase()
              });

            case 3:
              user = _context.sent;

              if (user) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", {
                token: null,
                error: 'INVALID_USERNAME_PASSWORD'
              });

            case 6:
              correctPassword = user.authenticate(password);

              if (correctPassword) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", {
                token: null,
                error: 'INVALID_USERNAME_PASSWORD'
              });

            case 9:
              return _context.abrupt("return", {
                token: (0, _auth.generateToken)(user),
                error: null
              });

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function mutateAndGetPayload(_x) {
      return _mutateAndGetPayload.apply(this, arguments);
    }

    return mutateAndGetPayload;
  }(),
  outputFields: {
    token: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_ref2) {
        var token = _ref2.token;
        return token;
      }
    },
    error: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_ref3) {
        var error = _ref3.error;
        return error;
      }
    }
  }
});

exports["default"] = _default;