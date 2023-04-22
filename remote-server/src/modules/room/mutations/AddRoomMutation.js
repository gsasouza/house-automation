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
const RoomModel_1 = require("../RoomModel");
const RoomConnection_1 = __importDefault(require("../RoomConnection"));
const RoomLoader = __importStar(require("../RoomLoader"));
exports.default = (0, graphql_relay_1.mutationWithClientMutationId)({
    name: 'AddRoom',
    inputFields: {
        name: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        },
        type: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        },
    },
    mutateAndGetPayload: ({ name, type }, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { user } = context;
        const room = yield RoomModel_1.Room.findOne({ name });
        if (!user) {
            return {
                id: null,
                error: 'UNAUTHENTICATED_USER',
            };
        }
        if (room) {
            return {
                id: null,
                error: 'ROOM_ALREADY_EXISTS',
            };
        }
        try {
            const room = yield RoomModel_1.Room.create({ name, type, createdBy: user.id });
            return {
                id: room._id,
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
        roomEdge: {
            type: RoomConnection_1.default.edgeType,
            resolve: ({ id }, _, context) => __awaiter(void 0, void 0, void 0, function* () {
                const room = yield RoomLoader.load(context, id);
                if (!room) {
                    return null;
                }
                return {
                    cursor: (0, graphql_relay_1.toGlobalId)('Room', room.id),
                    node: room,
                };
            }),
        },
        error: {
            type: graphql_1.GraphQLString,
            resolve: ({ error }) => error,
        },
    },
});
