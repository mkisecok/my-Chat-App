import { useState} from 'react'
// import { Box,AccountCircle, TextField,ChatIcon,Button,io} from './indexLogin'
import './App.scss';
// import './Login.scss'
import io from 'socket.io-client';
import { Chat } from './Chat/Chat'
import Login from './Login/Login'
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const[ isLogged, setIsLogged]=useState(false);
  
  
  return (
    
    <div className='App'>
    {
      !isLogged ?
  <Login
  username={username}
  room={room}
  socket={socket}
  setIsLogged={setIsLogged}
  setUsername={setUsername}
  setRoom={setRoom}

  />
      :
      <Chat 
      socket={socket}
      username={username}
      room={room}
       />
    }
    </div>
    
  );
}

export default App;
