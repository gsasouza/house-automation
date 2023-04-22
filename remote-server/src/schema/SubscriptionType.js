"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const subscriptions_1 = __importDefault(require("../modules/boardIo/subscriptions"));
exports.default = new graphql_1.GraphQLObjectType({
    name: 'Subscription',
    fields: Object.assign({}, subscriptions_1.default),
});
