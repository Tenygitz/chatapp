import React from 'react';
import ChatScreen from './components/ChatScreen';
import SideBar from './components/SideBar';
import "./HomePage.css";

function HomePage() {
  return (
    <div className='HomePage'>
      <div className='containers'>
   <SideBar/>
   <ChatScreen/></div>
    </div>
  )
}

export default HomePage