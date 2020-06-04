import React, {useState, useEffect} from 'react';
import {Button, Media} from 'reactstrap';
import NavBar from '../components/NavBar'
import {isLoggedIn} from '../config/auth';

const Profile = () => {
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());     //loggedIn returns the token if the user is logged in
    const [user, setUser] = useState("");

    const getUserInfo = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/auth/id/${loggedIn}`)
        .then(response => response.json()).then(userInfo => setUser(userInfo))
    }
    useEffect(() => {
        getUserInfo();
    }, []);

        console.log(user.pic);
        let img;
        if(user.pic == 0) {img =<Media object src={"/assets/DefaultUserIcon.png"} alt="Profile" width="100px"/>}
    return (
        <div className="profile">
            <NavBar loggedIn={loggedIn} setLoggedIn ={setLoggedIn}/>
            <Media>
                <Media left>
                    {img}
                </Media>
                <Media body>
                    <Media heading>Welcome {user.username} to your Profile</Media>
                    {user.bio}
                    <Button>Update Bio</Button>
                </Media>
            </Media>
        </div>
    )
}

export default Profile;