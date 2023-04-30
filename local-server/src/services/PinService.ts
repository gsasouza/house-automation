import * as five from 'johnny-five'
import {Pin, Relay, Board as BoardType, PinOption} from "johnny-five";

export class PinService {
    private pins: Record<string, Pin | undefined> = {};

    constructor() {
    }

    changePinState(pinAddress: string, state: boolean) {
        const pin = new five.Pin(pinAddress);
        if (pin) {
            if (state) {
                pin.high();
            } else {
                pin.low();
            }
        }
    }

    createPin(board: BoardType, pinAddress: number): Pin {
        const pin = new five.Pin({pin: pinAddress, board} as PinOption);
        this.pins = {...this.pins, [pinAddress]: pin};
        return pin;
    }

    disconnectCallback = (host: string) => async () => {
        // this.removePin(host);
        // send message to remote server to update board status
    };
}
