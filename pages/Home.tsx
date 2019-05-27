import * as React from 'react';

import { useSocket } from '../hooks/useSocket';

const Home = () => {
  const [message, setMessage] = React.useState('');
  const { socket } = useSocket();
  React.useEffect(() => {
    socket.on('Relé Gabriel', data => setMessage(data.value))
  }, [socket])

  const onClick = (e) => {
    socket.emit('Relé Gabriel', {
      value: e.target.checked
    })
  }

  return (
    <div>
      <label>
        <input type="checkbox" onClick={onClick}/>
      </label>

      {message.toString()}
    </div>
  )
}


export default Home
