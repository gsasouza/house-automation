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
exports.publishBatch = exports.publish = exports.EVENTS = exports.kafka = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const kafkajs_1 = require("kafkajs");
const pubSub = new graphql_subscriptions_1.PubSub();
exports.kafka = new kafkajs_1.Kafka({
    clientId: 'kafka-producer',
    brokers: ['localhost:9092'],
});
const producer = exports.kafka.producer({
    retry: { retries: 8, initialRetryTime: 1, maxRetryTime: 30000, },
    connectionTimeout: 10000,
    authenticationTimeout: 10000,
});
exports.EVENTS = {
    BOARD_IO: {
        ADD: 'BOARD_IO_ADD',
        REMOVE: 'BOARD_IO_REMOVE',
        CHANGED: 'BOARD_IO_CHANGED',
        CONNECTED: 'BOARD_CONNECTED',
    },
    BOARD: {
        ADD: 'BOARD_ADD',
        REMOVE: 'BOARD_REMOVE',
        CHANGED: 'BOARD_CHANGED',
        CONNECTED: 'BOARD_CONNECTED',
        INIT: 'BOARD_INIT',
    }
};
const publish = (user, message) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.publishBatch)(user, [{ value: JSON.stringify(message) }]);
});
exports.publish = publish;
const publishBatch = (user, messages) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield producer.connect();
        const response = yield producer.send({
            topic: user,
            messages,
        });
        console.log(response);
        yield producer.disconnect();
    }
    catch (e) {
        console.log(e);
    }
});
exports.publishBatch = publishBatch;
exports.default = pubSub;
