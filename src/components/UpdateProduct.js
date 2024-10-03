import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const params = useParams()
    const [error, setError] = useState('')
    const Navigate = useNavigate()

    useEffect(() => {
        getProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getProduct = async () => {
        await axios.get(`https://ecomm-dashboard-ar1h.onrender.com/product-data/${params.id}`, {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
            .then(result => {
                setName(result.data.name)
                setPrice(result.data.price)
                setCategory(result.data.category)
                setCompany(result.data.company)
            })
            .catch(err => {
                console.log(err);

            })

    }

    const updateProduct = async (e) => {
        e.preventDefault()

        if (!name || !price || !category || !company) {
            setError(true)
            return false;
        }
        let data ={name,price,company,category}
        
        await axios.put(`https://ecomm-dashboard-ar1h.onrender.com/update-product/${params.id}`,data,{
            headers: {
                authorization: JSON.parse(localStorage.getItem('token')),
                'Content-Type': 'application/json',
            }
        }).then(result => {
            if (result) {
                Navigate('/')

            }
        })


    }

    return (
        <>
            <div>
                <form onSubmit={updateProduct} className="update_product">
                    <h2>Update Product</h2>
                    <input type="text" placeholder="Enter Product Name" className="inputbox" value={name} onChange={(e) => setName(e.target.value)} />
                    {error && !name && <span className="invalid_input" >Enter Valid Name</span>}
                    <input type="text" placeholder="Enter Product Price" className="inputbox" value={price} onChange={(e) => setPrice(e.target.value)} />
                    {error && !price && <span className="invalid_input" >Enter Valid Price</span>}
                    <input type="text" placeholder="Enter Product Category" className="inputbox" value={category} onChange={(e) => setCategory(e.target.value)} />
                    {error && !category && <span className="invalid_input" >Enter Valid Category</span>}
                    <input type="text" placeholder="Enter Product Company" className="inputbox" value={company} onChange={(e) => setCompany(e.target.value)} />
                    {error && !company && <span className="invalid_input" >Enter Valid Company</span>}
                    <button className="updateProductBtn" >Update Product</button>
                </form>
            </div>
        </>
    )
}

export default UpdateProduct;
