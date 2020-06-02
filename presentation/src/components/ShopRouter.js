import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from 'react-router-dom';
import Home from '../pages/Home';
import Inventory from '../pages/Inventory';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';
import {isLoggedIn, logout} from '../config/auth';

const ShopRouter = () => {
    return(
        <Router>
            <div>
                <Switch>
                    <Route exact path="/inventory">
                        <Inventory/>  
                    </Route>
                    <PrivateRoute exact path="/profile">
                        <Profile/>
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
        }
        />
    )
}

  export default ShopRouter;