import React from "react";
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from "react-router-dom";
// import HomeIcon from '@mui/icons-material/Home';
const Nav = () => {
    const authe = localStorage.getItem('user')
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate('/signup')
    }
    
    return (
        <>
            <img alt="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIcTa7JnwY25hw1FXUF8-Zgh9N1JWnwPfBaA&s" className="logo"/>
            <div>
                {authe ? <ul className="nav_bar">
                    <Stack direction='row' spacing={10} variant={'primary'}>
                        <li className=""><Link to="/">Product</Link></li>
                        <li className=""><Link to="/add">Add Product</Link></li>
                        <li className=""><Link to={`/profile/${JSON.parse(authe)._id}`}>Profile</Link></li>
                        <li className=""><Link to="/signup" onClick={logout}>Logout ({JSON.parse(authe).name})</Link></li>
                    </Stack>
                </ul> :
                    <ul className="nav_bar">
                        <Stack direction='row' spacing={10} variant={'primary'} marginLeft={100}>
                            <li><Link to="/signup">SignUp</Link></li>
                            <li className=""><Link to="/login">LogIn</Link></li>
                        </Stack>
                    </ul>
                }
            </div>
        </>
    )
}
export default Nav;