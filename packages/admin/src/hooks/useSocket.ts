import * as React from 'react';
import io from 'socket.io-client';

const defaultSocket = {
  on: () => {},
  emit: () => {}
}

export const useSocket = () => {
  const [socket, setSocket] = React.useState(defaultSocket);
  React.useEffect(() => {
    const socketIo = io();
    setSocket(socketIo);
  }, []);
  return { socket }
}

export default useSocket
