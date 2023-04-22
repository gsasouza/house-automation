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
exports.loadBoards = exports.clearCache = exports.load = exports.getLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const graphql_mongoose_loader_1 = require("@entria/graphql-mongoose-loader");
const BoardModel_1 = require("./BoardModel");
class Board {
    constructor(data) {
        this.id = data.id;
        this._id = data._id;
        this.name = data.name;
        this.type = data.type;
        this.host = data.host;
        this.port = data.port;
        this.connected = data.connected;
        this.createdBy = data.createdBy;
    }
}
exports.default = Board;
const getLoader = () => new dataloader_1.default(ids => (0, graphql_mongoose_loader_1.mongooseLoader)(BoardModel_1.Board, ids));
exports.getLoader = getLoader;
const viewerCanSee = (context) => !!context.user;
const load = (context, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        return null;
    }
    const loader = context.dataloaders ? context.dataloaders.BoardLoader : (0, exports.getLoader)();
    try {
        const data = yield loader.load(id);
        //Bypass if its an event
        return viewerCanSee(context.dataloaders ? context : { user: true }) ? new Board(data) : null;
    }
    catch (err) {
        console.log(err);
        return null;
    }
});
exports.load = load;
const clearCache = ({ dataloaders }, id) => {
    return dataloaders.BoardLoader.clear(id.toString());
};
exports.clearCache = clearCache;
const loadBoards = (context, args) => __awaiter(void 0, void 0, void 0, function* () {
    const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {};
    const boards = BoardModel_1.Board.find(where, { _id: 1 }).sort({ createdAt: -1 });
    return (0, graphql_mongoose_loader_1.connectionFromMongoCursor)({
        cursor: boards,
        context,
        args,
        loader: exports.load,
    });
});
exports.loadBoards = loadBoards;
