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
const BoardIoConnection_1 = __importDefault(require("../BoardIoConnection"));
const pubSub_1 = __importStar(require("../../../pubsub/pubSub"));
const BoardIoChangedPayloadType = new graphql_1.GraphQLObjectType({
    name: 'BoardIoChangedPayload',
    fields: () => ({
        boardIoEdge: {
            type: BoardIoConnection_1.default.edgeType,
            resolve: ({ boardIo }) => ({
                cursor: (0, graphql_relay_1.offsetToCursor)(boardIo.id),
                node: boardIo,
            })
        },
    }),
});
const boardIoChangedSubscription = {
    type: BoardIoChangedPayloadType,
    subscribe: () => pubSub_1.default.asyncIterator(pubSub_1.EVENTS.BOARD_IO.CHANGED),
};
exports.default = boardIoChangedSubscription;
