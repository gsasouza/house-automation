"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GRAPHQL_URL = exports.SERIAL_PORT = exports.JWT_SECRET = exports.NODE_ENV = exports.SERVER_PORT = exports.DB_URL = void 0;

var path = _interopRequireWildcard(require("path"));

var _dotenvSafe = _interopRequireDefault(require("dotenv-safe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var root = path.join.bind(void 0, __dirname, '../../../../');

_dotenvSafe["default"].load({
  path: root('.env'),
  sample: root('.env.example')
});

var DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/house-automation';
exports.DB_URL = DB_URL;
var SERVER_PORT = process.env.PORT || 3000;
exports.SERVER_PORT = SERVER_PORT;
var NODE_ENV = process.env.NODE_ENV;
exports.NODE_ENV = NODE_ENV;
var JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_SECRET = JWT_SECRET;
var SERIAL_PORT = process.env.SERIAL_PORT;
exports.SERIAL_PORT = SERIAL_PORT;
var GRAPHQL_URL = process.env.GRAPHQL_URL;
exports.GRAPHQL_URL = GRAPHQL_URL;