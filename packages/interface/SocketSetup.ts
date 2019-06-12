import * as five from 'johnny-five';
import { Server } from 'socket.io';

export const initSocket = (io: Server, boards) => {
  io.on('connect', socket => {
    for (const board of boards) {
      const { pins } = board;
      for (const [name, pin] of Object.entries(pins)) {
        //@TODO add more io types
        if (pin instanceof five.Relay) {
          socket.emit(name, { value: pin.isOn })
          socket.on(name, data => {
            data.value ? pin.on() : pin.off();
            socket.emit(name, { value: pin.isOn })
          })
        }
      }
    }
  })
}

