"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadUsers = exports.clearCache = exports.load = exports.getLoader = exports["default"] = void 0;

var _dataloader = _interopRequireDefault(require("dataloader"));

var _graphqlMongooseLoader = require("@entria/graphql-mongoose-loader");

var _shared = require("@gsasouza/shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var User = function User(data) {
  _classCallCheck(this, User);

  _defineProperty(this, "id", void 0);

  _defineProperty(this, "_id", void 0);

  _defineProperty(this, "name", void 0);

  _defineProperty(this, "username", void 0);

  _defineProperty(this, "isAdmin", void 0);

  this.id = data.id;
  this._id = data._id;
  this.name = data.name;
  this.isAdmin = data.isAdmin;
  this.username = data.username;
};

exports["default"] = User;

var getLoader = function getLoader() {
  return new _dataloader["default"](function (ids) {
    return (0, _graphqlMongooseLoader.mongooseLoader)(_shared.User, ids);
  });
};

exports.getLoader = getLoader;

var viewerCanSee = function viewerCanSee() {
  return true;
};

var load =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(context, id) {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (id) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", null);

          case 2:
            _context.prev = 2;
            _context.next = 5;
            return context.dataloaders.UserLoader.load(id);

          case 5:
            data = _context.sent;
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", null);

          case 11:
            return _context.abrupt("return", viewerCanSee() ? new User(data) : null);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 8]]);
  }));

  return function load(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.load = load;

var clearCache = function clearCache(_ref2, id) {
  var dataloaders = _ref2.dataloaders;
  return dataloaders.UserLoader.clear(id.toString());
};

exports.clearCache = clearCache;

var loadUsers =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(context, args) {
    var where, users;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            where = args.search ? {
              name: {
                $regex: new RegExp("^".concat(args.search), 'ig')
              }
            } : {};
            users = _shared.User.find(where, {
              _id: 1
            }).sort({
              createdAt: -1
            });
            return _context2.abrupt("return", (0, _graphqlMongooseLoader.connectionFromMongoCursor)({
              cursor: users,
              context: context,
              args: args,
              loader: load
            }));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function loadUsers(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.loadUsers = loadUsers;