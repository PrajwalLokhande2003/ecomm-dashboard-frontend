import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

const Login = () =>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()

    const handelLogin = async () =>{
    let result = await fetch(`https://ecomm-dashboard-ar1h.onrender.com/login`,{
        method:'post',
        body: JSON.stringify({email,password}),
        headers:{
            'Content-Type':'application/json'
        }
    })
        result = await result.json()
        
        if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.user))
            localStorage.setItem('token',JSON.stringify(result.auth))
            navigate('/')
        }else{
            alert('please enter correct information')
        }
     
    }
    return (
        <>
        <div className="register_menu">
        <h1>LogIn Page</h1>
        <input className="inputbox" type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input className="inputbox" type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className="signupBtn" type="button" onClick={handelLogin}>LogIn</button>
        </div>

        </>
    )
}

export default Login;