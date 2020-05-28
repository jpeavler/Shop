import React, {useState, useEffect} from 'react';
import {Modal,ModalBody, ModalHeader, Button} from 'reactstrap'

import InventoryForm from './InventoryForm'

const InventoryDisplay = () => {
    const [inventory, setInv] = useState([]);
    const [isUpdate, setUpdate] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState('');
    const [displayActive, setActive] = useState(true);
    const [displayInactive, setInactive] = useState(true);
    const [filterModal, setFModal] = useState(false);  

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
            activeButton = <Button color="warning" onClick={() => toggleActive(item._id, false)}>Deactivate</Button>
        } else {
            activeButton = <Button color="success" onClick={() => toggleActive(item._id, true)}>Activate</Button>
            deleteButton = <Button color="danger" onClick={() => handleDelete(item._id)}>Delete</Button>      
        }
        if((item.isActive && displayActive) || (!item.isActive && displayInactive)) {
            return (
                <div key={item._id} className="item">
                    <h4 className="itemname">{item.name}</h4>
                    <Button color="primary" onClick={() => handleUpdate(item)}>Edit</Button>
                    {activeButton}
                    {deleteButton}
                    <p className="price">Price: ${item.price}</p>
                    <p className="quantity">Count: {item.quantity}</p>
                    <p className="description">{item.desc}</p>
                </div>
            )
        }
    });
    const toggleModal = () => setFModal(!filterModal);
    let renderForm;
    if(isUpdate) {
        renderForm = <InventoryForm key={itemToUpdate._id} refresh={getInv} isUpdate={isUpdate} myItem={itemToUpdate} id={itemToUpdate._id}/>
    } else {
        renderForm = <InventoryForm key="additem" refresh={getInv} isUpdate={isUpdate}/>
    }
    let activeDisplayBtn;
    if(displayActive) {
        activeDisplayBtn = <Button color="primary" key="hideAct" onClick={() => setActive(false)} block>Hide Active</Button>
    }else {
        activeDisplayBtn = <Button color="primary" key="showAct" onClick={() => setActive(true)} block>Show Active</Button>
    }
    let inactiveDisplayBtn;
    if(displayInactive) {
        inactiveDisplayBtn = <Button color="primary" key="hideIn" onClick={() => setInactive(false)} block>Hide Inactive</Button>
    }else {
        inactiveDisplayBtn = <Button color="primary" key="showIn" onClick={() => setInactive(true)} block>Show Inactive</Button>
    }
    return (
        <div key="inventory" className="inventory">
            <h1>Shop</h1>
            {renderForm}
            <Button color="primary" onClick={() => toggleModal()}>Display Settings</Button>
            <Modal key="filter" isOpen={filterModal} toggle={toggleModal} className="modaltoggle">
                <ModalHeader>Sort and Hide Options</ModalHeader>
                <ModalBody>
                {activeDisplayBtn}
                {inactiveDisplayBtn}
                <Button color="primary" onClick={() => handleSort("quantity")} block>Sort by Count</Button>
                <Button color="primary" onClick={() => handleSort("price")} block>Sort by Price</Button>
                <Button color="secondary" onClick={() => toggleModal()} block>Close</Button>
                </ModalBody>
            </Modal>
            {displayInv}
        </div>
    )
}
export default InventoryDisplay;