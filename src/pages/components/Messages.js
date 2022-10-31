import React ,{useContext,useEffect,useRef}from 'react';
import "./Messages.css";
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';



function Messages({message}) {
  const { data } = useContext(ChatContext);
  const {currentUser} =useContext(AuthContext)
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className='Messages-info 'id="owner">
          <img src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          } />
          <span>now</span></div>

      
     <div className='Messages-container'>
      <p>{message.text}</p>
      {message.img &&<img src={message.img} />}
     </div>
    </div>
  )
}

export default Messages