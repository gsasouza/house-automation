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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_relay_1 = require("graphql-relay");
const NodeInterface_1 = require("./NodeInterface");
const UserType_1 = __importDefault(require("../modules/user/UserType"));
const UserConnection_1 = __importDefault(require("../modules/user/UserConnection"));
const UserLoader = __importStar(require("../modules/user/UserLoader"));
const RoomConnection_1 = __importDefault(require("../modules/room/RoomConnection"));
const RoomLoader = __importStar(require("../modules/room/RoomLoader"));
const BoardLoader = __importStar(require("../modules/board/BoardLoader"));
const BoardConnection_1 = __importDefault(require("../modules/board/BoardConnection"));
const BoardIoLoader = __importStar(require("../modules/boardIo/BoardIoLoader"));
const BoardIoConnection_1 = __importDefault(require("../modules/boardIo/BoardIoConnection"));
exports.default = new graphql_1.GraphQLObjectType({
    name: 'Query',
    description: 'The root of all... queries',
    fields: () => ({
        node: NodeInterface_1.NodeField,
        me: {
            type: UserType_1.default,
            resolve: (_, args, context) => {
                return context.user;
            },
        },
        users: {
            type: UserConnection_1.default.connectionType,
            args: Object.assign(Object.assign({}, graphql_relay_1.connectionArgs), { search: {
                    type: graphql_1.GraphQLString,
                } }),
            resolve: (_, args, context) => UserLoader.loadUsers(context, args),
        },
        rooms: {
            type: RoomConnection_1.default.connectionType,
            args: Object.assign(Object.assign({}, graphql_relay_1.connectionArgs), { search: {
                    type: graphql_1.GraphQLString,
                } }),
            resolve: (_, args, context) => RoomLoader.loadRooms(context, args),
        },
        boards: {
            type: BoardConnection_1.default.connectionType,
            args: Object.assign(Object.assign({}, graphql_relay_1.connectionArgs), { search: {
                    type: graphql_1.GraphQLString,
                } }),
            resolve: (_, args, context) => BoardLoader.loadBoards(context, args),
        },
        boardIos: {
            type: BoardIoConnection_1.default.connectionType,
            args: Object.assign(Object.assign({}, graphql_relay_1.connectionArgs), { search: {
                    type: graphql_1.GraphQLString,
                } }),
            resolve: (_, args, context) => BoardIoLoader.loadBoardIos(context, args),
        },
    })
});
