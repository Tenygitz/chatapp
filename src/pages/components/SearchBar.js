import React,{useContext, useState} from 'react';
import "./SearchBar.css";
import { collection, query, where ,getDocs,  setDoc,doc,updateDoc, serverTimestamp,getDoc} from "firebase/firestore";
import {db} from "../../firebase";
import { AuthContext } from '../../context/AuthContext';




function SearchBar() {
  const {currentUser} =useContext(AuthContext)
  const [userName,setUserName]=useState("")
  const [user,setUser]=useState(false)
  const handleSearch=async()=>{
    const q = query(collection(db,"users") ,where("displayName", "==", userName)); // checking firebase user using firebase query
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
     setUser(doc.data())
  console.log(doc.id, " => ", doc.data());
});
  }
  const handleKey=(e)=>{
    e.code==="Enter" && handleSearch()    //when enter input press enter key 
  }
  const handleSelect=async()=>{
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUserName("")
  };
 
  return (
    <div className='SearchBar'>
        <div className='Search-info'>
            <input type='text' placeholder='Find a User' onKeyDown={handleKey}value={userName} onChange={(e)=>setUserName(e.target.value)}/>
        </div>{user &&                       //if serach user is found, diplay the div block
        <div className='chatusers-search' onClick={handleSelect}>
            <img  src={user.photoURL}/>
           <h3>{user.displayName}</h3>
        </div>}
    </div>
  )
}

export default SearchBar