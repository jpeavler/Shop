import React, {useState, useEffect} from 'react';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';
import {setToken} from '../../config/auth';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remembered, setRemembered] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const localUsername = localStorage.getItem('username');
        if(localUsername) {
            setUsername(localUsername);
            setRemembered(true);
        }
    }, []);
    const toggleRemembered = () => {
        setRemembered(!remembered);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setMsg('');
        console.log(username, password, remembered);
        if(remembered) {
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('username');
        }
        fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        }).then(response => {
            if(response.status === 200) {
                setToken(response.headers.get('authentication'));
            } else {
                setMsg('Login Failed');
            }
        })
    }
    return (
        <Form onSubmit={handleSubmit}>
            <h3>Login</h3>
            <Input type="text" value={username} placeholder="Username" 
                    onChange={({target}) => setUsername(target.value)}/>
            <Input type="password" value={password} placeholder="Password" 
                    onChange={({target}) => setPassword(target.value)}/>
            <FormGroup>
                <Input type="checkbox" name="remember" checked={remembered} 
                        onChange={toggleRemembered}/>
                <Label for="remember">Remember Me</Label>
            </FormGroup>
            <Button block>Login</Button>
            <span style={{'color': 'red'}}>{msg}</span>
        </Form>
    )
}

export default LoginForm;