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
const graphql_1 = require("graphql");
const graphql_relay_1 = require("graphql-relay");
const NodeInterface_1 = require("../../schema/NodeInterface");
const UserLoader = __importStar(require("../user/UserLoader"));
const UserType_1 = __importDefault(require("../user/UserType"));
const RoomLoader = __importStar(require("../room/RoomLoader"));
const BoardType_1 = __importDefault(require("../board/BoardType"));
const BoardLoader = __importStar(require("../board/BoardLoader"));
const BoardIoType = new graphql_1.GraphQLObjectType({
    name: 'BoardIo',
    description: 'BoardIo data',
    fields: () => ({
        id: (0, graphql_relay_1.globalIdField)('BoardIo'),
        _id: {
            type: graphql_1.GraphQLString,
            resolve: boardIo => boardIo._id,
        },
        name: {
            type: graphql_1.GraphQLString,
            resolve: boardIo => boardIo.name,
        },
        type: {
            type: graphql_1.GraphQLString,
            resolve: boardIo => boardIo.type,
        },
        board: {
            type: BoardType_1.default,
            resolve: (boardIo, _, context) => BoardLoader.load(context, boardIo.board),
        },
        pin: {
            type: graphql_1.GraphQLString,
            resolve: boardIo => boardIo.pin,
        },
        state: {
            type: graphql_1.GraphQLBoolean,
            resolve: boardIo => boardIo.state,
        },
        connected: {
            type: graphql_1.GraphQLBoolean,
            resolve: (boardIo, _, context) => __awaiter(void 0, void 0, void 0, function* () {
                const board = yield BoardLoader.load(context, boardIo.board);
                return board.connected;
            }),
        },
        room: {
            type: BoardIoType,
            resolve: (boardIo, _, context) => RoomLoader.load(context, boardIo.room),
        },
        createdBy: {
            type: UserType_1.default,
            resolve: (boardIo, _, ctx) => UserLoader.load(ctx, boardIo.createdBy),
        },
    }),
    interfaces: () => [NodeInterface_1.NodeInterface],
});
exports.default = BoardIoType;
