import { useEffect, useState, ScrollToBottom,TextField,SendIcon,Button,useContext,ChatContext,Picker} from './index'
import './Chat.scss'



export const Chat = () => {
  
  const {socket,username,room}=useContext(ChatContext)
 
  const [currentMessage,setCurrentMessage]=useState('');
  const [messages,setMessages]=useState([]);
  const [showEmoji, setShowEmoji]=useState(false);

  const onEmojiClick =  (event, emojiObject) => {
    setCurrentMessage(prevInput=> prevInput + emojiObject.emoji);
    setShowEmoji(false)
    
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
     <div className='footer-group'>
       
      
    <span  onClick={()=>setShowEmoji(!showEmoji)} >😀</span>
    
    
    <TextField
        id="input-with-icon-textfield"
        className='input'
        placeholder='Chatting now..'
        value={currentMessage}
        onChange={(e)=>setCurrentMessage(e.target.value)}
        onClick={()=>setShowEmoji(false)}
        onKeyPress={(e)=>{e.key==='Enter'&& sendMessage()}}
        variant="standard"
            /> 
      <Button 
      variant="contained" 
      className='button'
      onClick={sendMessage}
      >
        <SendIcon/>
      </Button>
      </div> 
      {
        showEmoji &&<Picker onEmojiClick={onEmojiClick} pickerStyle={{marginTop:'1em', width:'100%', height:'15rem'}}/>
    }
    </div>
  </div>
  );
};
