import React, {useState} from 'react';
import NavBar from '../components/NavBar';
import LoginForm from '../components/UserComp/LoginForm';
import {isLoggedIn} from '../config/auth'

const Home = () => {
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());
    return (
        <div className="home">
            <NavBar loggedIn={loggedIn} setLoggedIn ={setLoggedIn}/>
            <h2>Home</h2>
            <LoginForm loggedIn={loggedIn} setLoggedIn ={setLoggedIn}/>
        </div>
    )
}

export default Home;