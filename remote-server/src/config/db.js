"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/house-automation';
const connect = (url = DB_URL, opts = {}) => {
    return mongoose_1.default.connect(url, Object.assign(Object.assign({}, opts), { useNewUrlParser: true }));
};
exports.connect = connect;
