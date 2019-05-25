import * as React from 'react';

import { useSocket } from '../hooks/useSocket';

const Home = () => {
  const [message, setMessage] = React.useState('');
  const { socket } = useSocket();
  React.useEffect(() => {
    socket.on('lamp1', data => setMessage(data.checked))
  }, [socket])

  const onClick = (e) => {
    socket.emit('lamp1', {
      checked: e.target.checked
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
