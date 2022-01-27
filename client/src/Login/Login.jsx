
import {useState,io, Box,AccountCircle, TextField,ChatIcon,Button,ChatContext,useContext} from './index'
import './Login.scss';

const socket = io.connect("http://localhost:3001");

function Login() {
    // const [login,setLogin]=useState({username:'',
    // room:'',
    // isLogged:false});
const {login, setLogin}=useContext(ChatContext)
const joinRoom=()=>{
    if(login.username!=='' && login.room !=='' )
    {
      socket.emit('joinRoom', login.room)
      setLogin({isLogged:true})
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
        onChange={(e)=>setLogin({username:e.target.value})} />
      </Box>
      <Box sx={{ display: 'flex',           alignItems: 'flex-end' }} className='box'>
        <ChatIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField 
        id="input-with-sx" 
        label="Chat Room" 
        variant="standard" 
        onChange={(e)=>setLogin({room:e.target.value})}/>
      </Box>
      <Button 
      variant="contained" 
      className='button'
      onClick={joinRoom}
      >Join a Room</Button>


  </div>
  
  );
}

export default Login;
