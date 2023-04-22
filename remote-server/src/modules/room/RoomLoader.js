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
exports.loadRooms = exports.clearCache = exports.load = exports.getLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const graphql_mongoose_loader_1 = require("@entria/graphql-mongoose-loader");
const RoomModel_1 = require("./RoomModel");
class Room {
    constructor(data) {
        this.id = data.id;
        this._id = data._id;
        this.name = data.name;
        this.type = data.type;
        this.createdBy = data.createdBy;
    }
}
exports.default = Room;
const getLoader = () => new dataloader_1.default(ids => (0, graphql_mongoose_loader_1.mongooseLoader)(RoomModel_1.Room, ids));
exports.getLoader = getLoader;
const viewerCanSee = (context) => !!context.user;
const load = (context, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        return null;
    }
    let data;
    try {
        data = yield context.dataloaders.RoomLoader.load(id);
    }
    catch (err) {
        return null;
    }
    return viewerCanSee(context) ? new Room(data) : null;
});
exports.load = load;
const clearCache = ({ dataloaders }, id) => {
    return dataloaders.RoomLoader.clear(id.toString());
};
exports.clearCache = clearCache;
const loadRooms = (context, args) => __awaiter(void 0, void 0, void 0, function* () {
    const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {};
    const rooms = RoomModel_1.Room.find(where, { _id: 1 }).sort({ type: -1 });
    return (0, graphql_mongoose_loader_1.connectionFromMongoCursor)({
        cursor: rooms,
        context,
        args,
        loader: exports.load,
    });
});
exports.loadRooms = loadRooms;
