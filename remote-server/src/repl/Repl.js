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
const repl_1 = __importDefault(require("repl"));
const db_1 = require("../config/db");
const UserModel_1 = require("../modules/user/UserModel");
const BoardModel_1 = require("../modules/board/BoardModel");
const BoardIOModel_1 = require("../modules/boardIo/BoardIOModel");
// User.create({ username: "gsasouza", password: "gabriel123", isAdmin: true, name: "Gabriel Souza"})
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connect)();
        const repl = repl_1.default.start('house::automation> ');
        repl.context.User = UserModel_1.User;
        repl.context.Board = BoardModel_1.Board;
        repl.context.BoardIO = BoardIOModel_1.BoardIo;
    }
    catch (error) {
        console.error('Unable to connect to database');
        process.exit(1);
    }
}))();
