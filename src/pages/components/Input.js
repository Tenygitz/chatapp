
import React, { useContext, useState } from "react";
import "./Input.css";
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import {arrayUnion,doc,serverTimestamp,Timestamp,updateDoc} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import{db,storage} from "../../firebase";
import { v4 as uuid } from "uuid";

function Input() {
  const { data } = useContext(ChatContext);
  const {currentUser} =useContext(AuthContext);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
         alert(error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {

      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className='Input'>
        <div className='input-container'>
            <input type="text" placeholder='Write Something' value={text} onChange={(e) => setText(e.target.value)}/> 
            
            </div>
            <div className='input-info'>
            <input type="file" id="file"  value={img} onChange={(e) => setImg(e.target.files[0])}/>
            <label htmlFor='file'> 
            <i class="fa-solid fa-upload"></i>
            </label>
            <i class="fa-solid fa-image"></i>
            <button onClick={handleSend} type="submit"className='sendBtn'>Send</button>
           
        </div>
    </div>
  )
}

export default Input