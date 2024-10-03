import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const AddProduct = (e) =>{

    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [category,setCategory] = useState('')
    const [company,setCompany] = useState('')
    const [image,setImage] = useState('')
    const [error,setError] = useState('')
    const Navigate = useNavigate()

    const addProduct = async(e) =>{

        e.preventDefault()

        if(!name || !price || !category || !company || !image){
            setError(true)
            return false;
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id
        const formData = new FormData()
        formData.append('image',image)
        formData.append('name',name)
        formData.append('price',price)
        formData.append('company',company)
        formData.append('category',category)
        formData.append('userId',userId)
        let result = await axios.post('https://ecomm-dashboard-ar1h.onrender.com/add-product',formData,{
            headers:{
                'Content-Type':'multipart/form-data',
                authorization:JSON.parse(localStorage.getItem('token'))
                
            }
        })
        if(result){
            Navigate('/')
        }
        
        
    }

    return(
        <>
        <div >
            <form onSubmit={addProduct} className="add_product">
            <h2>Add Product</h2>
            <input type="text" placeholder="Enter Product Name" className="inputbox" value={name} onChange={(e)=>setName(e.target.value)}/>
            {error && !name && <span className="invalid_input" >Enter Valid Name</span>}
            <input type="text" placeholder="Enter Product Price" className="inputbox" value={price} onChange={(e)=>setPrice(e.target.value)} />
            {error && !price && <span className="invalid_input" >Enter Valid Price</span>}
            <input type="text" placeholder="Enter Product Category" className="inputbox" value={category} onChange={(e)=>setCategory(e.target.value)} />
            {error && !category && <span className="invalid_input" >Enter Valid Category</span>}
            <input type="text" placeholder="Enter Product Company" className="inputbox" value={company} onChange={(e)=>setCompany(e.target.value)} />
            {error && !company && <span className="invalid_input" >Enter Valid Company</span>}
            <input type="file" className="inputbox" onChange={(e)=>setImage(e.target.files[0])}/>
            {error && !image && <span className="invalid_input" >Enter Valid Image</span>}
            <button type="submit"  className="addProductBtn">Add Product</button>
            </form>
        </div>
        </>
    )
}

export default AddProduct;