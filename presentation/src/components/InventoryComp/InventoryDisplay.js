import React, {useState, useEffect} from 'react';

import InventoryForm from './InventoryForm'

const InventoryDisplay = () => {
    const [inventory, setInv] = useState([]);
    const [isUpdate, setUpdate] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState('');
    const [displayActive, setActive] = useState(true);
    const [displayInactive, setInactive] = useState(true);

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
    const handleSort = (sortMethod) => {
        let sortedInv = Object.assign([], inventory);
        if(sortMethod == "quantity") {
            sortedInv.sort((a, b) => b.quantity - a.quantity);
        } else if(sortMethod == "price") {
            sortedInv.sort((a, b) => b.price - a.price);
        }
        setInv(sortedInv);
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
        if((item.isActive && displayActive) || (!item.isActive && displayInactive)) {
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
        }
    });
    let renderForm;
    if(isUpdate) {
        renderForm = <InventoryForm key={itemToUpdate._id} refresh={getInv} isUpdate={isUpdate} myItem={itemToUpdate} id={itemToUpdate._id}/>
    } else {
        renderForm = <InventoryForm key="additem" refresh={getInv} isUpdate={isUpdate}/>
    }
    let activeDisplayBtn;
    if(displayActive) {
        activeDisplayBtn = <button key="hideAct" onClick={() => setActive(false)}>Hide Active</button>
    }else {
        activeDisplayBtn = <button key="showAct" onClick={() => setActive(true)}>Show Active</button>
    }
    let inactiveDisplayBtn;
    if(displayInactive) {
        inactiveDisplayBtn = <button key="hideIn" onClick={() => setInactive(false)}>Hide Inactive</button>
    }else {
        inactiveDisplayBtn = <button key="showIn" onClick={() => setInactive(true)}>Show Inactive</button>
    }
    return (
        <div key="inventory" className="inventory">
            <h1>Shop</h1>
            {renderForm}
            {activeDisplayBtn}
            {inactiveDisplayBtn}
            <button onClick={() => handleSort("quantity")}>Sort by Count</button>
            <button onClick={() => handleSort("price")}>Sort by Price</button>
            {displayInv}
        </div>
    )
}
export default InventoryDisplay;