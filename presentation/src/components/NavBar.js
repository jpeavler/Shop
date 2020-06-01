import React from 'react';
import {Link} from 'react-router-dom';
import '../stylesheets/NavBar.css';

const NavBar = () =>{
    return(
        <nav>
            <Link to='/' className="NavLink">Home</Link>
            <Link to='/profile' className="NavLink">Profile</Link>
            <Link to='/inventory' className="NavLink">Inventory</Link>
            <Link to='/signup' className="NavLink">Signup</Link>
        </nav>
    )
}

export default NavBar;