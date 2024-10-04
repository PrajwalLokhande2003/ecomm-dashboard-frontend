import React, { useEffect, useState } from "react";
import {useParams,useNavigate} from 'react-router-dom'
import axios from "axios";
import Loder from "./Loder";

const Profile = () =>{

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [userId,setUserid] = useState('')
    const [loding,setLoding] = useState()

    const Navigate = useNavigate()
    const params = useParams()

    useEffect(()=>{
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getData = async () =>{
        setLoding(true)
        await axios.get(`https://ecomm-dashboard-ar1h.onrender.com/user-data/${params.id}`,{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        }).then((result)=>{
        setName(result.data[0].name)
        setEmail(result.data[0].email)
        setUserid(result.data[0]._id)
        setLoding(false)
        
    })
        
    }
    const updateProfile = async(e) =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('name',name)
        formData.append('email',email)
        formData.append('_id',userId)
        await axios.put(`https://ecomm-dashboard-ar1h.onrender.com/update-user/${params.id}`,formData,{
        headers:{
            'Content-Type':'application/json',
            authorization:JSON.parse(localStorage.getItem('token')),
               
            }          
        })
        .then((res)=>{
            if(res){
            Navigate('/')
            localStorage.setItem('user',res.config.data)
            
        }
        console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    return(
        <>
        {loding && <Loder/>}
        <div>
        <form  onSubmit={updateProfile} className="update_profile">
            <h2>Profile</h2>
            <input type="text" placeholder="Enter Name" className="inputbox"  value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="email" placeholder="Enter Email" className="inputbox" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <button className="updateProfileBtn"  >Update Profile</button>
            </form>
        </div>

        </>
    )
}

export default Profile;
