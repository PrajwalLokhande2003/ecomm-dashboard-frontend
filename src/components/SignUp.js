import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import Loder from "./Loder";


const SignUp = () =>{
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loding,setLoding] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    })

    const inputEvent = (e) =>{
        setName(e.target.value)
    }
    const inputEventOne = (e) =>{
        setEmail(e.target.value)
    }
    const inputEventTwo = (e) =>{
        setPassword(e.target.value)
    }
    const collectData = async () =>{
        setLoding(true)
            let response = await fetch('https://ecomm-dashboard-ar1h.onrender.com/register',{
            method:"POST",
            body: JSON.stringify({name,email,password}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        response = await response.json()
        
        if(response.auth){
            localStorage.setItem('user',JSON.stringify(response.result))
            localStorage.setItem('token',JSON.stringify(response.auth))
            navigate('/')
            setLoding(false)
        }
        
    }

    return (
        <>
        {loding && <Loder/>}
        <div className="register_menu">
        <h1>Register</h1>
        <input className="inputbox" type="text" placeholder="Enter Name" value={name} onChange={inputEvent}/>
        <input className="inputbox" type="email" placeholder="Enter Email" value={email} onChange={inputEventOne}/>
        <input className="inputbox" type="password" placeholder="Enter Password" value={password} onChange={inputEventTwo}/>
        <button className="signupBtn" type="button" onClick={collectData}>SignUp</button>
        </div>

        </>
    )
}

export default SignUp;