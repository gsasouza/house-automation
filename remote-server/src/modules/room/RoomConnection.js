"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_relay_1 = require("graphql-relay");
const RoomType_1 = __importDefault(require("./RoomType"));
exports.default = (0, graphql_relay_1.connectionDefinitions)({
    name: 'Room',
    nodeType: RoomType_1.default,
    connectionFields: {
        count: {
            type: graphql_1.GraphQLInt,
        },
    },
});
