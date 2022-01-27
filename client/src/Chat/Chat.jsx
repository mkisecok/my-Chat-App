import { useEffect, useState, ScrollToBottom,useContext,ChatContext} from './index'
import './Chat.scss'
export const Chat = () => {
 
  const {socket,login,setLogin}=useContext(ChatContext)
  const [currentMessage,setCurrentMessage]=useState('');
  const [messages,setMessages]=useState([]);

  const sendMessage= async()=>{
    if(currentMessage !=='')
    {
      const messageData={
        room:login.room,
        author:login.username,
        message:currentMessage,
        time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessages((list)=>[...list, messageData]);
      setCurrentMessage('')
    }
  }

  return (
  <div className='Chat'>
    <div className='chat-header'>Live Chat</div>
    <div className='chat-body'>
    <ScrollToBottom>



    </ScrollToBottom>
    </div>
  </div>
  );
};
