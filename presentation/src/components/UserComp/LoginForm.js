import React, {useState, useEffect} from 'react';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap'

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remembered, setRemembered] = useState(false);

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
        console.log(username, password, remembered);
        if(remembered) {
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('username');
        }
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
        </Form>
    )
}

export default LoginForm;