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
exports.KafkaService = void 0;
const kafkajs_1 = require("kafkajs");
const ACCOUNT = process.env.ACCOUNT;
class KafkaService {
    constructor() {
        this.consume = (onMessage) => __awaiter(this, void 0, void 0, function* () {
            yield this.consumer.connect();
            yield this.consumer.subscribe({ topic: ACCOUNT, fromBeginning: false });
            yield this.consumer.run({
                // this function is called every time the consumer gets a new message
                eachMessage: onMessage,
            });
        });
        const kafka = new kafkajs_1.Kafka({ clientId: ACCOUNT, brokers: ['localhost:9092'] });
        this.consumer = kafka.consumer({ groupId: ACCOUNT });
        this.producer = kafka.producer();
    }
}
exports.KafkaService = KafkaService;
