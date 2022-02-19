import {
    useEffect,
    useState,
    ScrollToBottom,
    TextField,
    SendIcon,
    Button,
    useContext,
    ChatContext,
    Picker,
    DarkModeIcon,
    LightModeIcon
} from './index';

import './Chat.scss';

export const Chat = () =>
{  
    const {
        socket,
        username,
        room, 
        color
    } = useContext(ChatContext);
 
    const [ currentMessage, setCurrentMessage ]=useState('');
    const [ messages, setMessages ]=useState([]);
    const [ showEmoji, setShowEmoji ]=useState(false);
    const [ mode, setMode ]= useState(true);

    const onEmojiClick =  (event, emojiObject) =>
    {
        setCurrentMessage(prevInput => prevInput + emojiObject.emoji);
        setShowEmoji(false);
    };

    const sendMessage= async() =>
    {
        if(currentMessage !== '')
        {
            const messageData =
            {
                room:room,
                author:username,
                color: '#' + color,
                userId:socket.id,
                message:currentMessage,
                time:new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
            };
            
            await socket.emit('send_message', messageData);
            
            setMessages((list) => [ ...list, messageData ]);
            setCurrentMessage('');
        }
    };

    useEffect(() =>
    {
        socket.on('receive_message', (data) => 
        {
            setMessages((list) => [ ...list, data ]);
        });
   
    }, [ socket ]);

    return (
        <div className='Chat'>
            <div className='chat-header'>
                <h3> {`Chatting with Room ${room}`}</h3>
                <span onClick={ () => setMode(!mode)}>
                    {
                        mode?
                            <LightModeIcon />
                            :
                            <DarkModeIcon />
                    }
                </span>
            </div>
            <div className={`chat-body ${mode && 'dark' }`}>
                <ScrollToBottom className='scroll'>
                    {
                        messages.map((messageData, i) =>
                        {
                            return(
                                <div key={i} className='message' id={socket.id===messageData.userId ? 'yours':'others' }>

                                    <p className='message-content' style={{ background: messageData.color }}>
                                        {
                                            messageData.message
                                        }
                                    </p>
                              
                                    <div className='message-bottom'>
                                        <span className='author'>{messageData.userId===socket.id ?'You': messageData.author}</span>
                                        <span className='time'> {messageData.time}</span>
                                    </div>
                                </div>
                            );
                        })
                    }
                </ScrollToBottom>
            </div>
    
            <div className='chat-footer'>
                <div className='footer-group'>
                    <span  onClick={ () => setShowEmoji(!showEmoji) } >😀</span>
    
                    <TextField
                        id = "input-with-icon-textfield"
                        className = 'input'
                        placeholder = 'Chatting now..'
                        value = { currentMessage }
                        onChange = { (e) => { setCurrentMessage(e.target.value); }}
                        onClick = { (e) => { setShowEmoji(false); }}
                        onKeyPress = { (e) => { e.key==='Enter'&& sendMessage(); }}
                        variant = "standard"
                    /> 
      
                    <Button 
                        variant = "contained" 
                        className = 'button'
                        onClick = { sendMessage }
                    >
                        <SendIcon/>
                    </Button>
                </div> 
                {
                    showEmoji && <Picker onEmojiClick = { onEmojiClick } pickerStyle = {{ marginTop:'1em', width:'100%', height:'15rem' }}/>
                }
            </div>
        </div>
    );
};
