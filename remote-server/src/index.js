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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const server_1 = require("@apollo/server");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const ws_1 = require("ws");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express4_1 = require("@apollo/server/express4");
const ws_2 = require("graphql-ws/lib/use/ws");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const schema_1 = __importDefault(require("./schema/schema"));
const dataloadersMiddleware_1 = require("./loaders/dataloadersMiddleware");
const auth_1 = require("./auth");
const db_1 = require("./config/db");
const consumer_1 = require("./pubsub/consumer");
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(auth_1.authenticatedMiddleware);
const httpServer = (0, http_1.createServer)(app);
const wsServer = new ws_1.WebSocketServer({
    server: httpServer,
    path: '/graphql',
});
const serverCleanup = (0, ws_2.useServer)({ schema: schema_1.default }, wsServer);
const server = new server_1.ApolloServer({
    schema: schema_1.default,
    plugins: [
        (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({
            httpServer, serverWillStart() {
                return __awaiter(this, void 0, void 0, function* () {
                    return {
                        drainServer() {
                            return __awaiter(this, void 0, void 0, function* () {
                                yield serverCleanup.dispose();
                            });
                        },
                    };
                });
            },
        }),
    ],
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connect)();
    }
    catch (error) {
        console.error('Unable to connect to database');
        process.exit(1);
    }
    yield server.start();
    yield (0, consumer_1.consume)();
    app.use('/graphql', (0, cors_1.default)(), body_parser_1.default.json(), (0, express4_1.expressMiddleware)(server, {
        context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
            return ({
                dataloaders: (0, dataloadersMiddleware_1.getDataLoaders)(),
                user: (yield (0, auth_1.getUser)(req.headers.authorization)).user
            });
        })
    }));
    httpServer.listen(PORT, () => {
        console.log(`🚀  Server is now running on http://localhost:${PORT}/graphql`);
    });
}))();
