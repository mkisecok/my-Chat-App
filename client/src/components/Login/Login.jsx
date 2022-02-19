
import { useNavigate } from 'react-router-dom';
import {
    Box,
    AccountCircle, 
    TextField,
    ChatIcon,
    Button,
    useContext,
    ChatContext
} from './index';
import './Login.scss';

export default function Login()
{
    const navigate = useNavigate();

    const
        { 
            username, room, socket, setIsLogged, setRoom, setUsername, setColor 
        } = useContext(ChatContext);

    const joinRoom=() =>
    {
        if(username!=='' && room !=='' )
        {
            socket.emit('joinRoom', room);
            setColor(Math.floor(Math.random() * 16777215).toString(16));
            navigate('/chat');
            setIsLogged(true);
        }
    };
  
    return (
        <div className='login'>
            <h1>Login Chat</h1>
            
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className='box'>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField 
                    id="input-with-sx" 
                    label="Username" 
                    variant="standard"
                    onChange={(e) => setUsername(e.target.value)} />
            </Box>
    
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className='box'>
                <ChatIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField 
                    id="input-with-sx" 
                    label="Chat Room" 
                    variant="standard" 
                    onChange={(e) => setRoom(e.target.value)}
                    onKeyPress={ (e) => { e.key==='Enter'&& joinRoom(); }}/>
            </Box>
    
            <Button 
                variant="contained" 
                className='button'
                onClick={ () => { joinRoom(); }}
            >Join a Room</Button>

        </div>
    );
}
