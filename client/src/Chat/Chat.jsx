import { useEffect, useState, ScrollToBottom,InputAdornment,TextField,SendIcon,MessageIcon,Button,useContext,ChatContext,Picker} from './index'
import './Chat.scss'



export const Chat = () => {
  
  const {socket,username,room}=useContext(ChatContext)
 
  const [currentMessage,setCurrentMessage]=useState('');
  
  const [messages,setMessages]=useState([]);
  // const [showEmoji, setShowEmoji]=useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const sendMessage= async()=>{
    if(currentMessage !== '')
    {
      const messageData={
        room:room,
        author:username,
        message:currentMessage,
        time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessages((list)=>[...list, messageData]);
      setCurrentMessage('')
    }
  }
  useEffect(()=>{
    socket.on("receive_message", (data)=>{
      setMessages((list)=>[...list,data])
    })
  },[socket])

  return (
  <div className='Chat'>
    <div className='chat-header'>Room Chatting</div>
    <div className='chat-body'>
    <ScrollToBottom className='scroll'>
{
  messages.map((messageData,i)=>{
    return(
      <div key={i} className='message' id={username===messageData.author ? 'yours':'others' }>

        <p className='message-content'>
          {
            messageData.message
          }
        </p>
        <div className='message-bottom'>
        <span className='author'>{messageData.author}</span>
        <span className='time'> {messageData.time}</span>
        </div>
        

      </div>
    )
  })
}
    </ScrollToBottom>
    </div>
    <div className='chat-footer'>
    <TextField
        id="input-with-icon-textfield"
        className='input'
        placeholder='Chatting now..'
        value={currentMessage}
        onChange={(e)=>setCurrentMessage(e.target.value)}
        onKeyPress={(e)=>{e.key==='Enter'&& sendMessage()}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {/* <MessageIcon /> */}
              {
                chosenEmoji?
                <span > {chosenEmoji.emoji}</span> 
                :
                <span>😀</span> 
              }
              <Picker onEmojiClick={onEmojiClick} />
             
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      {/* <span className='emoji'>
      <Picker set='google' />
      </span> */}
      
      <Button 
      variant="contained" 
      className='button'
      onClick={sendMessage}
      >
        <SendIcon/>
      </Button>
    </div>
  </div>
  );
};
