import React, {useState, useEffect} from 'react';

import InventoryForm from './InventoryForm'

const InventoryDisplay = () => {
    const [inventory, setInv] = useState([]);
    const [isUpdate, setUpdate] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState('');

    useEffect(() => {
        getInv();
    }, []);
    const getInv = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/inventory`)
            .then(response => response.json()).then(inv => setInv(inv))
            .then(setUpdate(false)).then(setItemToUpdate(''))
    }
    const handleUpdate = (item) => {
        setItemToUpdate(item);
        setUpdate(true);
    }
    const handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/api/inventory/${id}`, {
            method: 'DELETE'
        }).then(response => response.json()).then(getInv)
    }
    const toggleActive = (id, isActive) => {
        const newActiveStatus = {isActive};
        fetch(`${process.env.REACT_APP_API_URL}/api/inventory/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(newActiveStatus)
        }).then(getInv)
    }
    const displayInv = inventory.map((item) => {
        let activeButton;
        let deleteButton;
        if(item.isActive) {
            activeButton = <button onClick={() => toggleActive(item._id, false)}>Deactivate</button>
        } else {
            activeButton = <button onClick={() => toggleActive(item._id, true)}>Activate</button>
            deleteButton = <button onClick={() => handleDelete(item._id)}>Delete</button>      
        }
        return (
            <div key={item._id} className="item">
                <h4 className="itemname">{item.name}</h4>
                <button onClick={() => handleUpdate(item)}>Edit</button>
                {activeButton}
                {deleteButton}
                <p className="price">Price: ${item.price}</p>
                <p className="quantity">Count: {item.quantity}</p>
                <p className="description">{item.desc}</p>
            </div>
        )
    });

    let renderForm;
    if(isUpdate) {
        renderForm = <InventoryForm key={itemToUpdate._id} refresh={getInv} isUpdate={isUpdate} myItem={itemToUpdate} id={itemToUpdate._id}/>
    } else {
        renderForm = <InventoryForm key="additem" refresh={getInv} isUpdate={isUpdate}/>
    }
    return (
        <div key="inventory" className="inventory">
            <h1>Shop</h1>
            {renderForm}
            {displayInv}
        </div>
    )
}
export default InventoryDisplay;