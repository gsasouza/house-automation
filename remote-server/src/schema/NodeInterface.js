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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeField = exports.NodeInterface = void 0;
const graphql_relay_1 = require("graphql-relay");
const UserConnection_1 = __importDefault(require("../modules/user/UserConnection"));
const UserLoader = __importStar(require("../modules/user/UserLoader"));
const RoomType_1 = __importDefault(require("../modules/room/RoomType"));
const RoomLoader = __importStar(require("../modules/room/RoomLoader"));
const BoardType_1 = __importDefault(require("../modules/board/BoardType"));
const BoardLoader = __importStar(require("../modules/board/BoardLoader"));
const BoardIoType_1 = __importDefault(require("../modules/boardIo/BoardIoType"));
const BoardIoLoader = __importStar(require("../modules/boardIo/BoardIoLoader"));
const { nodeField, nodeInterface } = (0, graphql_relay_1.nodeDefinitions)((globalId, context) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, type } = (0, graphql_relay_1.fromGlobalId)(globalId);
    if (type === 'User') {
        return yield UserLoader.load(context, id);
    }
    if (type === 'Room') {
        return yield RoomLoader.load(context, id);
    }
    if (type === 'Board') {
        return yield BoardLoader.load(context, id);
    }
    if (type === 'BoardIo') {
        return yield BoardIoLoader.load(context, id);
    }
}), obj => {
    if (obj instanceof UserLoader.default) {
        return UserConnection_1.default.connectionType;
    }
    if (obj instanceof BoardLoader.default) {
        return BoardType_1.default;
    }
    if (obj instanceof BoardIoLoader.default) {
        return BoardIoType_1.default;
    }
    if (obj instanceof RoomLoader.default) {
        return RoomType_1.default;
    }
});
exports.NodeInterface = nodeInterface;
exports.NodeField = nodeField;
