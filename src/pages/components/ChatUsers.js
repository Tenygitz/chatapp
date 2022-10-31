import React,{useContext,useEffect,useState} from 'react';
import "./ChatUsers.css";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from '../../context/AuthContext';
import {db} from "../../firebase";
import { ChatContext } from '../../context/ChatContext';

function ChatUsers() {
   const { currentUser } = useContext(AuthContext);
   const { dispatch } = useContext(ChatContext);
   const [chats, setChats] = useState([]);
   useEffect(() => {
      const getChats = () => {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data());
        });
  
        return () => {
          unsub();
        };
      };
  
      currentUser.uid && getChats();
    }, [currentUser.uid]);
  console.log(Object.entries(chats))
  const handleSelect = (u) => {
   dispatch({ type: "CHANGE_USER", payload: u });
 };
  return (
    <div className='ChatUsers'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(
         <div className='chatusers-search' key={chat[0]}  onClick={() => handleSelect(chat[1].userInfo)}>
            <img  src={chat[1].userInfo.photoURL}/>
            <div className='chatusers-info'>
           <h3>{chat[1].userInfo.displayName}</h3>
           <p>{chat[1].lastMessage?.text}</p>
        </div></div>
       ))}
    </div>
  )
}

export default ChatUsers