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
const BoardIoLoader = __importStar(require("../BoardIoLoader"));
const BoardIoConnection_1 = __importDefault(require("../BoardIoConnection"));
const pubSub_1 = require("../../../pubsub/pubSub");
exports.default = (0, graphql_relay_1.mutationWithClientMutationId)({
    name: 'BoardIoChangeState',
    inputFields: {
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
        },
        state: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean),
        },
    },
    mutateAndGetPayload: ({ id, state }, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { user } = context;
        if (!user) {
            return {
                id: null,
                error: 'UNAUTHENTICATED_USER',
            };
        }
        try {
            const boardIo = yield BoardIOModel_1.BoardIo.findOne({ _id: (0, graphql_relay_1.fromGlobalId)(id).id });
            if (!boardIo) {
                return {
                    id: null,
                    error: 'BOARD_IO_NOT_FOUND',
                };
            }
            yield (0, pubSub_1.publish)(user.username, { event: pubSub_1.EVENTS.BOARD_IO.CHANGED, board: boardIo.board, pin: boardIo.pin, state });
            return {
                id: boardIo._id,
                state,
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
            resolve: ({ id, state }, _, context) => __awaiter(void 0, void 0, void 0, function* () {
                const boardIo = yield BoardIoLoader.load(context, id);
                if (!boardIo) {
                    return null;
                }
                return {
                    cursor: (0, graphql_relay_1.toGlobalId)('BoardIo', boardIo.id),
                    node: Object.assign(Object.assign({}, boardIo), { state }),
                };
            }),
        },
        error: {
            type: graphql_1.GraphQLString,
            resolve: ({ error }) => error,
        },
    },
});
