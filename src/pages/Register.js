import React,{useState} from 'react';
import "./Register.css";
import add from "../images/upload-icon.png";
import{ Link} from "react-router-dom";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth} from "../firebase"
import {storage} from "../firebase";
import { db } from '../firebase';
import {  ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import { useNavigate } from 'react-router-dom';



function Register() {
 
 const navigate=useNavigate()
  const [displayName,setDisplayName]=useState("")
  const [email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[file,setFile]=useState("")
  
 
 
  const onSubmitHandler=async(e)=>{
    e.preventDefault()
    try{
      const res=await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage,`${ displayName}`);
     
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
           
            //create empty user chats on firestore
           await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            alert(err.message);
           
            //setLoading(false);
          }
        });
      });
    } catch (err) {
      alert(err.message);
      
      
     // setLoading(false);
    }
  };
  return (
    <div className='Register'>
        <div className='Register-container'>
            <h1>We Chat</h1>
            <h3>Register</h3>
            <form className='Register-info'>
                <input type="text" value={displayName} onChange={(e)=>setDisplayName(e.target.value)}placeholder='Your Name'/>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}placeholder='email'/>
                <input type='password'value={password} onChange={(e)=>setPassword(e.target.value)}placeholder='******'/>
                <input type="file" value={file} onChange={(e)=>setFile(e.target.value)}id="file" />
                <label className='file-upload' htmlFor='file'>  
                 <img  className="imglogo"src={add} />
                 <span>Upload a file</span>
                </label>
                <button onClick={onSubmitHandler} type='submit'>Sign Up</button>
                
            </form>
            <div className='register-con'>
            <p>You have a Account</p><Link to="/login">Login</Link>
            </div>
        </div>

    </div>
  )
}

export default Register