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
exports.kafkaService = void 0;
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({ clientId: 'gsasouza', brokers: ['localhost:9092'] });
class KafkaService {
    constructor() {
        this.consume = (onMessage) => __awaiter(this, void 0, void 0, function* () {
            // first, we wait for the client to connect and subscribe to the given topic
            yield this.consumer.connect();
            yield this.consumer.subscribe({ topic: 'gsasouza-local', fromBeginning: true });
            yield this.consumer.run({
                // this function is called every time the consumer gets a new message
                eachMessage: onMessage,
            });
        });
        this.consumer = kafka.consumer({ groupId: 'gsasouza' });
        this.producer = kafka.producer();
    }
}
exports.kafkaService = new KafkaService();
