import { useState } from 'react'
import './App.css';
import io from 'socket.io-client'
import Chat from './Chat';
const socket = io.connect("http://localhost:3001");

function App() {
  const [username,setUsername]=useState('');
  const [room,setRoom]=useState('');
  const [isLogged, setIsLogged]=useState(false)

  const joinRoom=()=>{
    if(username!=='' && room !=='' )
    {
      socket.emit('joinRoom', room)
      setIsLogged(true)
    }
  }
  return (
    <>
    {
      !isLogged ?
    <div className="App">
      <h3>Join a chat</h3>
      <input type="text" 
      placeholder="John.." 
      onChange={(e)=>setUsername(e.target.value)} 
      />

      <input type="text" 
      placeholder="Room id" 
      onChange={(e)=>setRoom(e.target.value)} 
      />
      <button onClick={joinRoom}>Join a Room </button>
      </div>
      :
      <Chat socket={socket} username={username} room={room}/>
    }
    
      
    
    </>
  );
}

export default App;
