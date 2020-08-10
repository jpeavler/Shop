import React, {useState} from 'react';
import '../stylesheets/inventory.css';
import NavBar from '../components/NavBar';
import CartDisplay from '../components/InventoryComp/CartDisplay'
import {isLoggedIn} from '../config/auth';

const Cart = () => {
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());
    return (
        <div className="inventory">
            <h2>Cart</h2>
            <CartDisplay/>
        </div>
    )
}

export default Cart;