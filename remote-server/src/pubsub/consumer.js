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
exports.consume = void 0;
const pubSub_1 = require("./pubSub");
const BoardIOModel_1 = require("../modules/boardIo/BoardIOModel");
const BoardModel_1 = require("../modules/board/BoardModel");
const UserModel_1 = require("../modules/user/UserModel");
const consumer = pubSub_1.kafka.consumer({ groupId: 'remote-server' });
const onMessage = ({ topic, partition, message: rawMessage }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const message = JSON.parse((_b = (_a = rawMessage.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '');
    const { event } = message;
    console.log(message);
    switch (event) {
        case pubSub_1.EVENTS.BOARD.CONNECTED: {
            const { id, connected } = message;
            yield BoardModel_1.Board.updateOne({ _id: id }, { connected });
            break;
        }
        case pubSub_1.EVENTS.BOARD.INIT: {
            const { user: username } = message;
            const user = yield UserModel_1.User.findOne({ username });
            console.log(user, username);
            const board = yield BoardModel_1.Board.findOne({ createdBy: user._id });
            if (!board)
                return;
            const boardIos = yield BoardIOModel_1.BoardIo.find({ board: board._id });
            console.log(boardIos);
            const orderId = new Date().getTime();
            yield (0, pubSub_1.publishBatch)(username, [
                {
                    key: orderId.toString(),
                    value: JSON.stringify({
                        event: pubSub_1.EVENTS.BOARD.ADD,
                        id: board._id,
                        type: board.type,
                        port: board.port,
                        host: board.host,
                    })
                },
                ...boardIos.map((boardIo, index) => ({
                    key: (orderId + index).toString(),
                    value: JSON.stringify({
                        event: pubSub_1.EVENTS.BOARD_IO.ADD,
                        id: boardIo._id,
                        type: boardIo.type,
                        pin: boardIo.pin,
                        board: board._id
                    })
                }))
            ]);
            break;
        }
        case pubSub_1.EVENTS.BOARD_IO.CHANGED:
            break;
        case pubSub_1.EVENTS.BOARD_IO.CONNECTED: {
            const { pin, board, connected } = message;
            yield BoardIOModel_1.BoardIo.updateOne({ board, pin }, { connected });
            break;
        }
    }
});
const consume = () => __awaiter(void 0, void 0, void 0, function* () {
    yield consumer.connect();
    yield consumer.subscribe({ topic: 'remote-server', fromBeginning: false });
    yield consumer.run({
        eachMessage: onMessage,
    });
});
exports.consume = consume;
