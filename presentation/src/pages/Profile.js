import React, {useState} from 'react';
import NavBar from '../components/NavBar'
import {isLoggedIn} from '../config/auth';

const Profile = () => {
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());
    return (
        <div className="profile">
            <NavBar loggedIn={loggedIn} setLoggedIn ={setLoggedIn}/>
            <h2>Welcome to your Profile</h2>
        </div>
    )
}

export default Profile;