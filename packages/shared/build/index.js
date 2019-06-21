"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  connectDatabase: true
};
Object.defineProperty(exports, "connectDatabase", {
  enumerable: true,
  get: function get() {
    return _db.connect;
  }
});

var _db = require("./config/db");

var _config = require("./config");

Object.keys(_config).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _config[key];
    }
  });
});

var _models = require("./models");

Object.keys(_models).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _models[key];
    }
  });
});