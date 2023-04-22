"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardIo = exports.BoardIoEnum = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var BoardIoEnum;
(function (BoardIoEnum) {
    BoardIoEnum["RELAY"] = "RELAY";
})(BoardIoEnum = exports.BoardIoEnum || (exports.BoardIoEnum = {}));
const schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: Object.keys(BoardIoEnum),
    },
    pin: {
        type: String,
        required: true,
    },
    board: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Board'
    },
    room: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Room'
    },
    state: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });
exports.BoardIo = mongoose_1.default.model('boardIo', schema);
