"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_relay_1 = require("graphql-relay");
const UserModel_1 = require("../UserModel");
const auth_1 = require("../../../auth");
exports.default = (0, graphql_relay_1.mutationWithClientMutationId)({
    name: 'Login',
    inputFields: {
        username: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        },
        password: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        },
    },
    mutateAndGetPayload: ({ username, password }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield UserModel_1.User.findOne({ username: username.toLowerCase() });
        if (!user) {
            return {
                token: null,
                error: 'INVALID_USERNAME_PASSWORD',
            };
        }
        const correctPassword = user.authenticate(password);
        if (!correctPassword) {
            return {
                token: null,
                error: 'INVALID_USERNAME_PASSWORD',
            };
        }
        return {
            token: (0, auth_1.generateToken)(user),
            error: null,
        };
    }),
    outputFields: {
        token: {
            type: graphql_1.GraphQLString,
            resolve: ({ token }) => token,
        },
        error: {
            type: graphql_1.GraphQLString,
            resolve: ({ error }) => error,
        },
    },
});
