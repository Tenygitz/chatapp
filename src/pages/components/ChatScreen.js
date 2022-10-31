import React from 'react';
import "./ChatScreen.css"
import Input from './Input';
import Message from './Message';
import NavChat from './NavChat';

function ChatScreen() {
  return (
    <div  className='ChatScreen'>
       <NavChat/>
       <Message/>
       <Input/>
    </div>
  )
}

export default ChatScreen