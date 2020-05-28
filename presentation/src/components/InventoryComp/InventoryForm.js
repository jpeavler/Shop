import React, {useState} from 'react';
import {Modal} from 'reactstrap';

const InventoryForm = ({refresh, myItem, id}) => {
    let formName = "";
    let formDesc = "";
    let formCount = "";
    let formPrice = "";
    let modalOpen = false;
    if(myItem) {
        formName = myItem.name;
        formDesc = myItem.desc;
        formCount = myItem.quantity;
        formPrice = myItem.price;
        modalOpen = true;
    }
    const [name, setName] = useState(formName);
    const [desc, setDesc] = useState(formDesc);
    const [quantity, setCount] = useState(formCount);
    const [price, setPrice] = useState(formPrice);
    const [modal, setModal] = useState(modalOpen);

    const handleSubmit = (event) => {
        event.preventDefault();
        let isActive = true;
        if(myItem) {
            isActive = myItem.isActive;
            const updatedItem = {name, desc, quantity, price, isActive};
            fetch(`${process.env.REACT_APP_API_URL}/api/inventory/${id}`, {
                method: 'PUT',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(updatedItem)
            }).then(() => setName(''))
                .then(() => setDesc('')).then(() => setCount(''))
                .then(() => setPrice('')).then(() => refresh()).then(() => setModal(false))
        } else {
            const addedItem = {name, desc, quantity, price, isActive};
            fetch(`${process.env.REACT_APP_API_URL}/api/inventory`, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(addedItem)
            }).then(() => setName(''))
            .then(() => setDesc('')).then(() => setCount(''))
            .then(() => setPrice('')).then(() => refresh()).then(() => setModal(false))
        }
    }

    let renderSubmit;
    let cancel;
    if(myItem) {
        renderSubmit = <input key="edit" value="Edit Item" type="submit"/>
        cancel = <button type="button" key="cancel" onClick={() => refresh()}>Cancel Edit</button>
    } else {
        renderSubmit = <input key="add" value="Add Item" type="submit"/>
    }

    const toggle = () => setModal(!modal);

    return (
        <>
            <button onClick={toggle}>Add New Item</button>
            <Modal isOpen={modal} toggle={toggle} className="modelform">
                <form onSubmit={handleSubmit}>
                    <input placeholder="Item Name" value={name} 
                        type="text" onChange={({target}) => setName(target.value)} required/>
                    <textarea placeholder="Description" value={desc} 
                        onChange={({target}) => setDesc(target.value)}/>
                    <input placeholder="Item Count" value={quantity} type="number" 
                        onChange={({target}) => setCount(target.value)} required/>
                    <input placeholder="Price" value={price}
                        type="number" min=".01" step=".01" 
                        onChange={({target}) => setPrice(target.value)} required/>
                    {renderSubmit}
                    {cancel}
                </form>
            </Modal>
        </>
    )
}

export default InventoryForm;