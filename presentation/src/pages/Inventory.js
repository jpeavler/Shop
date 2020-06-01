import React from 'react';
import '../stylesheets/inventory.css';
import InventoryDisplay from '../components/InventoryComp/InventoryDisplay';

const Inventory = () => {
    return (
        <div className="inventory">
            <InventoryDisplay/>
        </div>
    )
}

export default Inventory;