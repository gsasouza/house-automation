"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeField = exports.NodeInterface = void 0;

var _graphqlRelay = require("graphql-relay");

var UserLoader = _interopRequireWildcard(require("../modules/user/UserLoader"));

var _UserType = _interopRequireDefault(require("../modules/user/UserType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(globalId, context) {
    var _fromGlobalId, id, type;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId), id = _fromGlobalId.id, type = _fromGlobalId.type;

            if (!(type === 'User')) {
              _context.next = 5;
              break;
            }

            _context.next = 4;
            return UserLoader.load(context, id);

          case 4:
            return _context.abrupt("return", _context.sent);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(), function (obj) {
  if (obj instanceof UserLoader["default"]) {
    return _UserType["default"];
  }
}),
    nodeField = _nodeDefinitions.nodeField,
    nodeInterface = _nodeDefinitions.nodeInterface;

var NodeInterface = nodeInterface;
exports.NodeInterface = NodeInterface;
var NodeField = nodeField;
exports.NodeField = NodeField;