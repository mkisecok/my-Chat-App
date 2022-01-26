import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
function Chat({socket, username, room}) {

    const [currentMessage, setCurrentMessage]=useState('');
    const [messageList, setMessageList]=useState([])
    const sendMessage= async ()=>{
        if(currentMessage!== '')
        {
            const messageData={
                room:room,
                author:username,
                message:currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message", messageData);
            setMessageList((list)=>[...list, messageData]);
            setCurrentMessage('')
        }
        
    }
    useEffect(()=>{
        socket.on("receive_message", (data)=>{
        setMessageList((list)=>[...list, data])    
        })
    },[socket])
  return (
  <div>
      <div className='header'>
          <p>Live chat</p>
      </div>
      <div className='body' >
          <ScrollToBottom>
          {
              messageList.map((messageData,i)=>{
               return( <div key={i} id={username===messageData.author ? 'yourmessage':'othersmessage'}>  
                   <h3>{messageData.author}</h3>
                   <p>{messageData.message}</p>
                   <span>{messageData.time}</span>
                   
                   </div>)
              })
          }
          </ScrollToBottom>
      </div>
      <div className='footer'>
          <input 
          type='text'
          value={currentMessage} 
          placeholder='heyy...'
          onChange={(e)=>setCurrentMessage(e.target.value)}
          onKeyPress={(e)=>{e.key === "Enter" && sendMessage()}}
          />
          <button onClick={sendMessage}>&#9658;</button>
      </div>

  </div>);
}

export default Chat;
