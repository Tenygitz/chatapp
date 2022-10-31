import React from 'react';
import "./NavBar.css";

import {signOut} from "firebase/auth";
import {auth} from "../../firebase";
import { AuthContext } from '../../context/AuthContext';
import { useContext } from "react";
function NavBar() {
  const {currentUser} =useContext(AuthContext)
  console.log("this is ",currentUser.photoURL)
  return (
    <div className='NavBar'>
        <div className='logo'>
             <img src="https://i.pinimg.com/originals/66/c9/44/66c94415043811725165e59b371a0aa2.png" alt="logo"/>
        </div>
        <div className='NavBar-container'>
            <img className='userimage' src={currentUser.photoURL} alt="icon"/>
            <h3>{currentUser.displayName}</h3>
            <button onClick={()=>signOut(auth)}className='logout-btn'>Logout</button>

        </div>
    </div>
  )
}

export default NavBar