import React from 'react';
import NavBar from '../components/NavBar'
import LoginForm from '../components/UserComp/LoginForm'

const Home = () => {
    return (
        <div className="home">
            <NavBar/>
            <h2>Home</h2>
            <LoginForm/>
        </div>
    )
}

export default Home;