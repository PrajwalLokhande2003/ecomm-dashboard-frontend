import React from "react";
import Nav from "./components/Nav";
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";
import UpdateImage from "./components/UpdateImage";
import Profile from "./components/Profile";
// import Loder from "./components/Loder";
const App = () =>{
    return(
        <>
        <BrowserRouter>
        <Nav/>
        <Routes>

        <Route element={<PrivateComponent/>}>
        
        <Route path="/" element={<ProductList/>}/>
        <Route path="/add" element={<AddProduct/>}/>
        <Route path="/update/:id" element={<UpdateProduct/>}/>
        <Route path="/logout" element={<h1>Logout Component</h1>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/update-image/:id" element={<UpdateImage/>}/>
        
        </Route>

        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        </Routes>
        </BrowserRouter>
        <Footer/>
        </>
    )
}
export default App;