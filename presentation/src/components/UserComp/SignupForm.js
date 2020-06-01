import React, {useState, useEffect} from 'react';
import {Form, Input, Button} from 'reactstrap'

const SignupForm = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pswrdconfirm, setConfirm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if(password === pswrdconfirm){
            const isActive = true;
            const bio = "Shop user";
            const pic = "default.jpg";
            const user = {username, email, password, isActive, bio, pic};
            fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(user)
            }).then(() => setUserName('')).then(() => setEmail(''))
                .then(() => setPassword('')).then(() => setConfirm(''))
        }
        else {
            //message to warn user that passwords don't match
        }
    }
    return (
        <Form className="signup" onSubmit={handleSubmit}>
            <Input placeholder="User Name" onChange={({target}) => setUserName(target.value)} value={username} required/>
            <Input placeholder="Email" type="email" onChange={({target}) => setEmail(target.value)} value={email} required/>
            <Input placeholder="Password" type="password" onChange={({target}) => setPassword(target.value)} value={password} required/>
            <Input placeholder="Password Confirmation" type="password" onChange={({target}) => setConfirm(target.value)} value={pswrdconfirm} required/>
            <Button>Submit</Button>
        </Form>
    )
}

export default SignupForm;