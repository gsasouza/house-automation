"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    hidden: true,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    "default": false
  }
}, {
  timestamps: true
});
userSchema.methods = {
  authenticate: function authenticate(plainTextPassword) {
    return _bcrypt["default"].compare(plainTextPassword, this.password);
  },
  encryptPassword: function encryptPassword(password) {
    return _bcrypt["default"].hash(password, 8);
  }
};
userSchema.pre('save', function hashPassword(next) {
  var _this = this;

  if (this.isModified('password')) {
    if (this.password) {
      this.encryptPassword(this.password).then(function (hash) {
        _this.password = hash;
        next();
      })["catch"](function (err) {
        return next(err);
      });
    } else {
      return next();
    }
  } else {
    return next();
  }
});

var User = _mongoose["default"].model('user', userSchema);

exports.User = User;