import { useState } from 'react'

import './App.scss';
import io from 'socket.io-client'
import { Chat } from './Chat/Chat'
import Login from './Login/Login';
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const[ isLogged, setIsLogged]=useState(false)

// const joinRoom=()=>{
//     if(username!=='' && room !=='' )
//     {
//       socket.emit('joinRoom', room)
//       setIsLogged(true)
//     }
// }


 
  return (
    
    <div className='App'>
    {
      !isLogged ?
      <Login 
      setRoom={setRoom} 
      setUsername={setUsername}
      room={room}
      username={username}
      setIsLogged={setIsLogged} />
      :
      <Chat 
      socket={socket}
      username={username}
      room={room} />
    }
    </div>
    
  );
}

export default App;
