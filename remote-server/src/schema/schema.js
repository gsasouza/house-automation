"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const QueryType_1 = __importDefault(require("./QueryType"));
const MutationType_1 = __importDefault(require("./MutationType"));
const SubscriptionType_1 = __importDefault(require("./SubscriptionType"));
exports.default = new graphql_1.GraphQLSchema({
    query: QueryType_1.default,
    mutation: MutationType_1.default,
    subscription: SubscriptionType_1.default,
});
