import React, {useState} from 'react';
import {Form, Input, Button, Spinner} from 'reactstrap'

const SignupForm = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pswrdconfirm, setConfirm] = useState('');
    const [displaySpinner, setSpinner] = useState(false);
    const [msg, setMsg] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        setSpinner(true);
        setMsg("");
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
            setMsg("Passwords must match");
        }
        setSpinner(false);
    }
    let spinner;
    if(displaySpinner) {spinner = <Spinner color="primary"/>}
    else {spinner = <></>}
    return (
        <>
            <Form className="signup" onSubmit={handleSubmit}>
                <Input placeholder="User Name" onChange={({target}) => setUserName(target.value)} value={username} required/>
                <Input placeholder="Email" type="email" onChange={({target}) => setEmail(target.value)} value={email} required/>
                <Input placeholder="Password" type="password" onChange={({target}) => setPassword(target.value)} value={password} required/>
                <Input placeholder="Password Confirmation" type="password" onChange={({target}) => setConfirm(target.value)} value={pswrdconfirm} required/>
                <Button block>Submit</Button>
                <span style={{'color': 'red'}}>{msg}</span> 
            </Form>
            {spinner}
        </>
    )
}

export default SignupForm;