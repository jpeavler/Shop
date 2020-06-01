import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from 'react-router-dom';
import Home from '../pages/Home';
import Inventory from '../pages/Inventory';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';

const ShopRouter = () => {
    return(
        <Router>
            <div>
                <Switch>
                    <Route path="/inventory">
                        <Inventory/>  
                    </Route>
                    <Route path="/profile">
                        <Profile/>
                    </Route>
                    <Route path="/signup">
                        <Signup/>
                    </Route>
                    <Route path="/" exact>
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

  export default ShopRouter;