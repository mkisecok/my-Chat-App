import { useState} from 'react'
import { Box,AccountCircle, TextField,ChatIcon,Button,io} from './indexLogin'
import './App.scss';
import './Login.scss'

import { Chat } from './Chat/Chat'

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const[ isLogged, setIsLogged]=useState(false);
  
  
  const joinRoom=()=>{
    if(username!=='' && room !=='' )
    {
      socket.emit('joinRoom', room)
      setIsLogged(true)
    }
    
}
  return (
    
    <div className='App'>
    {
      !isLogged ?
      <div className='login'>
      <h1>Login Chat</h1>
      <Box sx={{ display: 'flex',           alignItems: 'flex-end' }} className='box'>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField 
        id="input-with-sx" 
        label="Username" 
        variant="standard"
        onChange={(e)=>setUsername(e.target.value)} />
      </Box>
      <Box sx={{ display: 'flex',           alignItems: 'flex-end' }} className='box'>
        <ChatIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField 
        id="input-with-sx" 
        label="Chat Room" 
        variant="standard" 
        onChange={(e)=>setRoom(e.target.value)}/>
      </Box>
      <Button 
      variant="contained" 
      className='button'
      onClick={joinRoom}
      >Join a Room</Button>


  </div>
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
