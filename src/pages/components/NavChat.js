import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import "./NavChat.css"

function NavChat() {
  const {data}=useContext(ChatContext)
  console.log("this is ss ddff",data.user.displayName)
  return (
    <div className='NavChat'>
        <h3>{data.user?.displayName}</h3>
        <i className="fa-sharp fa-solid fa-list-ul"></i>
    </div>
  )
}

export default NavChat