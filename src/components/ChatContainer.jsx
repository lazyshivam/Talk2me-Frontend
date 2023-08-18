import React, { useState } from 'react'
import ChatNav from './ChatNav'
import Chat from './Chat';
import Participants from './Participants';
const ChatContainer = () => {
  
  const [navigate,setNavigate]=useState('messages');
  
  return (
    <div className='flex flex-col relative shadow-inner  shadow-slate-500    rounded-2xl ' style={{backgroundColor:'#edf0f5'}}>
      <ChatNav setNavigate={setNavigate}/>

      {navigate==="messages"?<Chat/>:
      <Participants/> }
     
    </div>
  )
}

export default ChatContainer
