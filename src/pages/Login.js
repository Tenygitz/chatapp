import React,{useState} from 'react';
import "./Login.css";
import{ Link} from "react-router-dom";
import {auth} from "../firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate()
 const onClickHandler=(e)=>{
 e.preventDefault()
 signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    navigate("/")
  })
  .catch((error) => {
   alert(error.message)
  });
 }
  return (
    <div className='Login'>
        <div className='Login-container'>
            <h1>We chat</h1>
            <h3>Login</h3>
            <form className='form-info'>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='*******'/>
                <button onClick={onClickHandler} type='submit'>Sign In</button>
            </form>
            <div className='register-container'> <p>If you dont have Account?</p><Link to="/register">Register</Link></div>
           
        </div>
    </div>
  )
}

export default Login