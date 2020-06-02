import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import '../stylesheets/NavBar.css';
import {logout, isLoggedIn} from '../config/auth';

const NavBar = () =>{
    let logBtn;
    if(isLoggedIn()) {
        logBtn = <Button onClick={() => logout()} color="primary">Logout</Button>
    } else {
        logBtn = <Link to='/signup' className="NavLink">Signup</Link>
    }
    return(
        <nav>
            <Link to='/' className="NavLink">Home</Link>
            <Link to='/profile' className="NavLink">Profile</Link>
            <Link to='/inventory' className="NavLink">Inventory</Link>
            {logBtn}
        </nav>
    )
}

export default NavBar;