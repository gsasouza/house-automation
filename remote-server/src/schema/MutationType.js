"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const mutations_1 = __importDefault(require("../modules/user/mutations"));
const mutations_2 = __importDefault(require("../modules/room/mutations"));
const mutations_3 = __importDefault(require("../modules/board/mutations"));
const mutations_4 = __importDefault(require("../modules/boardIo/mutations"));
exports.default = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: () => (Object.assign(Object.assign(Object.assign(Object.assign({}, mutations_1.default), mutations_2.default), mutations_3.default), mutations_4.default))
});
