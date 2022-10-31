import React from 'react';
import ChatUsers from './ChatUsers';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import "./SideBar.css"

function SideBar() {
  return (
    <div className='SideBar'>
        <NavBar/>
        <SearchBar/>
        <ChatUsers/>
    </div>
  )
}

export default SideBar