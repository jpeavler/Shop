import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from 'react-router-dom';
import Home from '../pages/Home';
import Inventory from '../pages/Inventory';
import Profile from '../pages/Profile';
import Cart from '../pages/Cart';
import Signup from '../pages/Signup';
import {isLoggedIn} from '../config/auth';
import NavBar from './NavBar';

const ShopRouter = () => {
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());
    return(
        <Router>
            <div>
                <NavBar loggedIn={loggedIn} setLoggedIn ={setLoggedIn}/>
                <Switch>
                    <PrivateRoute exact path="/inventory">
                        <Inventory/>  
                    </PrivateRoute>
                    <PrivateRoute exact path="/profile">
                        <Profile/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/cart">
                        <Cart/>
                    </PrivateRoute>
                    <Route exact path="/signup">
                        <Signup/>
                    </Route>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

const PrivateRoute = ({ children, ...rest}) => {
    return (
        <Route {...rest} render={({location}) => 
            isLoggedIn() ? (children) : (
            <Redirect to={{pathname: '/', state: {from: location}}} />
            )
        }/>
    )
}

  export default ShopRouter;