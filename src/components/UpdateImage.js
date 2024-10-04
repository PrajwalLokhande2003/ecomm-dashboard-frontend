
import React, { useState } from "react";
import axios from "axios";
import {useParams,useNavigate} from 'react-router-dom'
import Loder from "./Loder";


const UpdateImage = () =>{

    const [image,setImage] = useState('')
    const [loding,setLoding] = useState()
    
    const Navigate = useNavigate()
    const params = useParams()

    const updateImg = async(e) =>{
        e.preventDefault()
        setLoding(true)
        const formData = new FormData()
        formData.append('image',image)
        let result = await axios.put(`https://ecomm-dashboard-ar1h.onrender.com/update-product-image/${params.id}`,formData,{
            headers:{
                'Content-Type':'multipart/form-data' ,
                authorization:JSON.parse(localStorage.getItem('token'))
                   
                  }
        })
        if(result){
            Navigate('/')
            setLoding(false)
        }
    }

    return(
        <>
        {loding && <Loder/>}
        <div>
        <form onSubmit={updateImg} className="update_image">
        <h3>Update Image</h3>
        <input type="file" className="inputbox" onChange={(e)=>setImage(e.target.files[0])}/>
        <button className="updateImgBtn">Update Image</button>
        </form>
        </div>
        </>
    )
}

export default UpdateImage;