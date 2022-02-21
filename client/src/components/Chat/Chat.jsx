import {
    useEffect,
    useState,
    ScrollToBottom,
    TextField,
    SendIcon,
    useContext,
    ChatContext,
    Picker,
    Button,
    ChatTimeUpdater,
    DarkModeIcon,
    LightModeIcon,
    ReactMarkdown,
    MouseOverPopover,
    ChatHelpDialog
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
    // const [ openDialog, setOpenDialog ] = useState(false);
    const [ typing, setTyping ] = useState('');

    const onEmojiClick =  (event, emojiObject) =>
    {
        setCurrentMessage(prevInput => prevInput + emojiObject.emoji);
        setShowEmoji(false);
    };

    // const handleCloseDialog = (value) =>
    // {
    //     setOpenDialog(false);
    // };

    const handleCheckBrightness = (input) =>
    {
        const brightness = Math.round(((input[ 0 ] * 299) + (input[ 1 ] * 587) + (input[ 2 ] * 114)) / 1000 );

        return brightness > 125 ? 'black' : 'white';
    };

    const sendMessage= async() =>
    {
        if(currentMessage !== '')
        {
            const messageData =
            {
                room:room,
                author:username,
                color: color,
                userId:socket.id,
                message:currentMessage,
                time: new Date().getTime()
            };
            
            await socket.emit('send_message', messageData);
            
            setMessages((list) => [ ...list, messageData ]);
            setCurrentMessage('');
            setTyping('');

        }
    };

    const handleFocus = async (e) =>
    {
        
        await socket.emit('send_typing', { username, room } );
        setTyping(username);
        // if(currentMessage !== '')
        // {
        //     setTyping('');
        // } 
        
    };

    useEffect(() =>
    {
        socket.on('receive_message', (data) => 
        {
            setMessages((list) => [ ...list, data ]);
            setTyping('');
        });
        socket.on('receive_typing', (data) => 
        {   
            
            setTyping(data.username);
            
        });
   
    }, [ socket ]);
    
    return (
        <div className='Chat'>
            <div className='chat-header'>
                {
                    typing === ''  ?
                        <p className='typing'>  {`Chatting with Room ${room}`}</p>:
                        <p className='typing'> {typing!==username ?`${typing.toUpperCase()} typing now...`: 'You typing now...' }</p>
                }
                
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

                                    <div
                                        className='message-content'
                                        style={{ background: `rgb(${messageData.color[ 0 ]}, ${ messageData.color[ 1 ]}, ${ messageData.color[ 2 ] })`, color: handleCheckBrightness(messageData.color) }}
                                    >
                                        <ReactMarkdown
                                            children={ messageData.message }
                                        ></ReactMarkdown>
                                    </div>

                                    <div className='message-bottom'>
                                        <span className='author'>{messageData.userId===socket.id ?'You': messageData.author}</span>
                                        <span className='time'>
                                            &nbsp;<ChatTimeUpdater timestamp={messageData.time} interval={1000} />
                                        </span>
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
                        onFocus={handleFocus}
                        onKeyPress = { (e) => { e.key === 'Enter' && sendMessage();  } }
                        variant = "standard"
                    />

                    {/* <Button variant="outlined" className='dialog_btn' onClick={ handleClickOpenDialog }>
                        <FeedIcon />
                    </Button> */}
                    <MouseOverPopover/>
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
            {/* <ChatHelpDialog
                open={openDialog}
                onClose={handleCloseDialog}
            /> */}
        </div>
    );
};
