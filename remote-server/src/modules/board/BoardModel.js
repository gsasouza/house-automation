"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = exports.BoardsEnum = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var BoardsEnum;
(function (BoardsEnum) {
    BoardsEnum["RASPBERRY"] = "RASPBERRY";
    BoardsEnum["ARDUINO"] = "ARDUINO";
    BoardsEnum["ESP8266"] = "ESP8266";
})(BoardsEnum = exports.BoardsEnum || (exports.BoardsEnum = {}));
const schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: Object.keys(BoardsEnum),
    },
    host: {
        type: String,
        unique: true,
    },
    port: {
        type: String,
        unique: true,
    },
    connected: {
        type: Boolean,
        required: true,
        default: false
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });
exports.Board = mongoose_1.default.model('board', schema);
