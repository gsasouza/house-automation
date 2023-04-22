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
exports.loadBoardIosByRoom = exports.loadBoardIosByRoomCount = exports.loadBoardIos = exports.clearCache = exports.load = exports.getLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const graphql_mongoose_loader_1 = require("@entria/graphql-mongoose-loader");
const BoardIOModel_1 = require("./BoardIOModel");
class BoardIo {
    constructor(data) {
        this.id = data.id;
        this._id = data._id;
        this.name = data.name;
        this.type = data.type;
        this.pin = data.pin;
        this.board = data.board;
        this.state = data.state;
        this.room = data.room;
        this.createdBy = data.createdBy;
    }
}
exports.default = BoardIo;
const getLoader = () => new dataloader_1.default(ids => (0, graphql_mongoose_loader_1.mongooseLoader)(BoardIOModel_1.BoardIo, ids));
exports.getLoader = getLoader;
const viewerCanSee = (context) => !!context.user;
const load = (context, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        return null;
    }
    let data;
    try {
        data = yield context.dataloaders.BoardIoLoader.load(id);
    }
    catch (err) {
        return null;
    }
    return viewerCanSee(context) ? new BoardIo(data) : null;
});
exports.load = load;
const clearCache = ({ dataloaders }, id) => {
    return dataloaders.BoardIoLoader.clear(id.toString());
};
exports.clearCache = clearCache;
const loadBoardIos = (context, args) => __awaiter(void 0, void 0, void 0, function* () {
    const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {};
    const boardIos = BoardIOModel_1.BoardIo.find(where, { _id: 1 }).sort({ createdAt: -1 });
    return (0, graphql_mongoose_loader_1.connectionFromMongoCursor)({
        cursor: boardIos,
        context,
        args,
        loader: exports.load,
    });
});
exports.loadBoardIos = loadBoardIos;
const loadBoardIosByRoomCount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const where = { room: id, };
    const aggregatePipeline = [
        { $match: { room: id } },
        {
            $lookup: {
                from: 'boards',
                localField: 'board',
                foreignField: '_id',
                as: 'board'
            }
        },
        { $match: { 'board.connected': true } },
        { $count: 'total' }
    ];
    const result = yield BoardIOModel_1.BoardIo.aggregate(aggregatePipeline);
    return result[0] ? result[0].total : 0;
});
exports.loadBoardIosByRoomCount = loadBoardIosByRoomCount;
const loadBoardIosByRoom = (context, args, id) => __awaiter(void 0, void 0, void 0, function* () {
    const where = { room: id };
    const boardIos = BoardIOModel_1.BoardIo.find(where, { _id: 1 }).sort({ createdAt: -1 });
    return (0, graphql_mongoose_loader_1.connectionFromMongoCursor)({
        cursor: boardIos,
        context,
        args,
        loader: exports.load,
    });
});
exports.loadBoardIosByRoom = loadBoardIosByRoom;
