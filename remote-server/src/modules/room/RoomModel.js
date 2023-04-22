"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = exports.RoomsEnum = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var RoomsEnum;
(function (RoomsEnum) {
    RoomsEnum["KITCHEN"] = "KITCHEN";
    RoomsEnum["BEDROOM"] = "BEDROOM";
    RoomsEnum["BATHROOM"] = "BATHROOM";
    RoomsEnum["LIVING_ROOM"] = "LIVING_ROOM";
})(RoomsEnum = exports.RoomsEnum || (exports.RoomsEnum = {}));
const schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: Object.keys(RoomsEnum),
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });
exports.Room = mongoose_1.default.model('room', schema);
