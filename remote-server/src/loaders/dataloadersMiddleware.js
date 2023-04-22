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
exports.getDataLoaders = void 0;
const UserLoader = __importStar(require("../modules/user/UserLoader"));
const RoomLoader = __importStar(require("../modules/room/RoomLoader"));
const BoardLoader = __importStar(require("../modules/board/BoardLoader"));
const BoardIoLoader = __importStar(require("../modules/boardIo/BoardIoLoader"));
const getDataLoaders = () => {
    return {
        RoomLoader: RoomLoader.getLoader(),
        UserLoader: UserLoader.getLoader(),
        BoardLoader: BoardLoader.getLoader(),
        BoardIoLoader: BoardIoLoader.getLoader(),
    };
};
exports.getDataLoaders = getDataLoaders;
