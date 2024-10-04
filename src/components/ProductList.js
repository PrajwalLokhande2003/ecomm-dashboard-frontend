import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import Loder from "./Loder";
const ProductList = () => {

    const [products, setProducts] = useState([])
    const [loding,setLoding] = useState()
    const userId = JSON.parse(localStorage.getItem('user'))._id
    
    useEffect(() => {
        getProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getProducts =  async() => {
        setLoding(true);
         await axios.get(`https://ecomm-dashboard-ar1h.onrender.com/products/${userId}`,{
            headers:{
                authorization:`${JSON.parse(localStorage.getItem('token'))}`
            }
         }).then((res)=>{
            setProducts(res.data)
            setLoding(false)
            
        })
        .catch((err)=>{
            console.log(err);
            
        })
        

    }
    const deleteProduct = async (id) =>{
        let result = await fetch(`https://ecomm-dashboard-ar1h.onrender.com/remove-product/${id}`,{
            method:'delete',
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        })
        if(result){
            // alert('product removed')
            getProducts()
        }
        
    }

    const searchHandel = async(e) =>{
        let key = e.target.value
        if(key){
            let result = await fetch(`https://ecomm-dashboard-ar1h.onrender.com/search/${key}`,{
                headers:{
                    authorization:JSON.parse(localStorage.getItem('token'))
                }
            })
            result = await result.json()
            if(result){
                setProducts(result)
            }
        }else{
            getProducts()
        }
       

    }


    return (
        <>
         {loding && <Loder/>}
            <div className="product-list">
               
                <h2>Product List</h2>
                <input type="text" className="searchBar" placeholder="Search Product" onChange={searchHandel}/>
                <ul style={{marginTop:'20px'}}>
                    <li>Sr.No</li>
                    <li>Image</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li>Category</li>
                    <li>Company</li>
                    <li>Operation</li>
                </ul>
                
                {
                  products.length > 0 ? products.map((item,index) =>
                        <ul key={item._id}>
                            <li>{index+1}</li>
                            {/* <li className="img"><img alt={"product "+(index+1)} src={require(`C:/Users/Dhiraj/react-node-project/Back-End/Image/${item.image}`)} height={60} width={70} />
                            <Link to={`/update-image/${item._id}`}><EditIcon className="img-edit" fontSize="1rem"/></Link>
                            </li> */}
                            <li className="img"><img alt={"product "+(index+1)} src={`${item.image}`} height={60} width={70} />
                            <Link to={`/update-image/${item._id}`}><EditIcon className="img-edit" fontSize="1rem"/></Link>
                            </li>
                            <li>{item.name}</li>
                            <li>$ {item.price}</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li style={{overflow:'hidden'}}>{<DeleteIcon onClick={()=>{deleteProduct(item._id)}} className="deleteBtn"/>}
                             <Link to={`/update/${item._id}`}><EditIcon/></Link></li>
                        </ul>
                    )
                    : <h1>No Product Found</h1>
                }
            </div>
        </>
    )
}

export default ProductList;