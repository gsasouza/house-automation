import { Server } from 'socket.io';

const setup = (io: Server, board) => {
  const { pins } = board;
  io.on('connect', socket => {
    const sendValue = () => socket.emit('lamp1', { checked: pins.lamp1.isOn })
    sendValue()
    socket.on('lamp1', data => {
      data.checked ? pins.lamp1.on() : pins.lamp1.off();
      sendValue();
    })
  })
}

export default setup;
