import React from 'react';
import '../stylesheets/inventory.css';
import CartDisplay from '../components/InventoryComp/CartDisplay'

const Cart = () => {
    return (
        <div className="inventory">
            <h2>Cart</h2>
            <CartDisplay/>
        </div>
    )
}

export default Cart;