import { useState} from 'react'
import './App.scss';
import io from 'socket.io-client';
import { Chat } from './components/Chat/Chat'
import Login from './components/Login/Login'
import { ChatContext } from './ChatContext'


const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const[ isLogged, setIsLogged]=useState(false);
  
  const value={
    username, setUsername,
    room, setRoom,
    setIsLogged,socket
  }
  return (

<ChatContext.Provider value={value}>

 
    <div className='App'>
    {
      !isLogged 
      ?
      <Login/>
      :
      <Chat/>
    }
    </div>
    
   
    </ChatContext.Provider>
  );
}

export default App;
