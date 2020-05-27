import React, {useState, useEffect} from 'react';

const InventoryDisplay = () => {
    const [inventory, setInv] = useState([]);
    const [isUpdate, setUpdate] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState('');

    useEffect(() => {
        getInv();
    }, []);

    const getInv = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/inventory`)
            .then(response => response.json())
            .then(inv => setInv(inv))
            .then(setUpdate(false))
            .then(setItemToUpdate(''))
    }

    const displayInv = inventory.map((item) => {
        return (
            <div key={item._id} className="item">
                <h4 className="itemname">{item.name}</h4>
                <p className="price">Price: ${item.price}</p>
                <p className="quantity">Count: {item.quantity}</p>
                <p className="description">{item.desc}</p>
            </div>
        )
    });

    return (
        <div key="inventory" className="inventory">
            <h1>Shop</h1>
            {displayInv}
        </div>
    )
}

export default InventoryDisplay;