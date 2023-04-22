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
const NodeInterface_1 = require("../../schema/NodeInterface");
const UserLoader = __importStar(require("../user/UserLoader"));
const UserType_1 = __importDefault(require("../user/UserType"));
const BoardType = new graphql_1.GraphQLObjectType({
    name: 'Board',
    description: 'Board data',
    fields: () => ({
        id: (0, graphql_relay_1.globalIdField)('Board'),
        _id: {
            type: graphql_1.GraphQLString,
            resolve: board => board._id,
        },
        name: {
            type: graphql_1.GraphQLString,
            resolve: board => board.name,
        },
        type: {
            type: graphql_1.GraphQLString,
            resolve: board => board.type,
        },
        host: {
            type: graphql_1.GraphQLString,
            resolve: board => board.host,
        },
        port: {
            type: graphql_1.GraphQLString,
            resolve: board => board.port,
        },
        connected: {
            type: graphql_1.GraphQLBoolean,
            resolve: board => board.connected
        },
        createdBy: {
            type: UserType_1.default,
            resolve: (board, _, ctx) => UserLoader.load(ctx, board.createdBy),
        },
    }),
    interfaces: () => [NodeInterface_1.NodeInterface],
});
exports.default = BoardType;
