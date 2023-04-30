"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardIo = exports.BoardIoEnum = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var BoardIoEnum;
(function (BoardIoEnum) {
    BoardIoEnum["RELAY"] = "RELAY";
})(BoardIoEnum = exports.BoardIoEnum || (exports.BoardIoEnum = {}));
const schema = new mongoose_1.Schema({
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
