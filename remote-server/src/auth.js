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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.authenticatedMiddleware = exports.getUser = exports.JWT_SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = require("./modules/user/UserModel");
exports.JWT_SECRET = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : 'SECRET_KEY';
function getUser(token) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!token)
            return { user: null };
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token.substring(4), exports.JWT_SECRET);
            const user = yield UserModel_1.User.findOne({ _id: decodedToken.id });
            console.log(user);
            return {
                user,
            };
        }
        catch (err) {
            return { user: null };
        }
    });
}
exports.getUser = getUser;
const authenticatedMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const { user } = yield getUser(authorization);
    req.context = Object.assign(Object.assign({}, req.context), { user });
    yield next();
});
exports.authenticatedMiddleware = authenticatedMiddleware;
function generateToken(user) {
    return `JWT ${jsonwebtoken_1.default.sign({ id: user._id }, exports.JWT_SECRET)}`;
}
exports.generateToken = generateToken;
