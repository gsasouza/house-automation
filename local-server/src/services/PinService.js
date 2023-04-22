"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.PinService = void 0;
const five = __importStar(require("johnny-five"));
class PinService {
    constructor() {
        this.pins = {};
        this.disconnectCallback = (host) => () => __awaiter(this, void 0, void 0, function* () {
            this.removePin(host);
            // send message to remote server to update board status
        });
    }
    changePinState(pinAddress, state) {
        // const pin = this.pins[pinAddress];
        const pin = new five.Pin(pinAddress);
        if (pin) {
            // console.log('heree', state, pin)
            if (state) {
                pin.high();
            }
            else {
                pin.low();
            }
        }
    }
    createPin(board, pinAddress) {
        const pin = new five.Pin({ pin: pinAddress, board });
        this.pins = Object.assign(Object.assign({}, this.pins), { [pinAddress]: pin });
        return pin;
    }
}
exports.PinService = PinService;
