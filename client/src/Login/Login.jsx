import React from 'react';
import { Box,AccountCircle, TextField,ChatIcon,Button} from './index'
import './Login.scss'
export default function Login({username,room,socket,setIsLogged,setRoom,setUsername}) {

    const joinRoom=()=>{
        if(username!=='' && room !=='' )
        {
          socket.emit('joinRoom', room)
          setIsLogged(true)
        }
    }
  return (
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
  )
}


