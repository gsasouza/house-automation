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
const BoardIOModel_1 = require("../BoardIOModel");
const BoardIoConnection_1 = __importDefault(require("../BoardIoConnection"));
const BoardIoLoader = __importStar(require("../BoardIoLoader"));
const pubSub_1 = require("../../../pubsub/pubSub");
exports.default = (0, graphql_relay_1.mutationWithClientMutationId)({
    name: 'AddBoardIo',
    inputFields: {
        name: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        },
        type: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        },
        pin: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
        },
        board: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
        },
        room: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
        },
    },
    mutateAndGetPayload: ({ name, type, pin, board, room }, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { user } = context;
        const boardIo = yield BoardIOModel_1.BoardIo.findOne({ name });
        if (!user) {
            return {
                id: null,
                error: 'UNAUTHENTICATED_USER',
            };
        }
        if (boardIo) {
            return {
                id: null,
                error: 'BOARD_IO_ALREADY_EXISTS',
            };
        }
        try {
            const boardIo = yield BoardIOModel_1.BoardIo.create({
                name,
                type,
                pin,
                board: (0, graphql_relay_1.fromGlobalId)(board).id,
                room: (0, graphql_relay_1.fromGlobalId)(room).id,
                createdBy: user.id
            });
            yield (0, pubSub_1.publish)(user.username, { event: pubSub_1.EVENTS.BOARD_IO.ADD, id: boardIo._id, type, pin, board: (0, graphql_relay_1.fromGlobalId)(board).id });
            return {
                id: boardIo._id,
                error: null,
            };
        }
        catch (error) {
            return {
                id: null,
                error,
            };
        }
    }),
    outputFields: {
        boardIoEdge: {
            type: BoardIoConnection_1.default.edgeType,
            resolve: ({ id }, _, context) => __awaiter(void 0, void 0, void 0, function* () {
                const boardIo = yield BoardIoLoader.load(context, id);
                if (!boardIo) {
                    return null;
                }
                return {
                    cursor: (0, graphql_relay_1.toGlobalId)('BoardIo', boardIo.id),
                    node: boardIo,
                };
            }),
        },
        error: {
            type: graphql_1.GraphQLString,
            resolve: ({ error }) => error,
        },
    },
});
