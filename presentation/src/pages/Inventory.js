import React from 'react';
import '../stylesheets/inventory.css';
import InventoryDisplay from '../components/InventoryComp/InventoryDisplay';
import NavBar from '../components/NavBar'

const Inventory = () => {
    return (
        <div className="inventory">
            <NavBar/>
            <InventoryDisplay/>
        </div>
    )
}

export default Inventory;