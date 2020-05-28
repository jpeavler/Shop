import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody, Form, Input, Button} from 'reactstrap';

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
    const toggle = () => setModal(!modal);
    let renderSubmit;
    let cancel;
    let formHeader;
    if(myItem) {
        renderSubmit = <Button color="primary" key="edit" type="submit" block>Edit Item</Button>
        cancel = <Button type="button" key="canceledit" onClick={() => refresh()} block>Cancel Edit</Button>
        formHeader = <ModalHeader key="edithead">Edit Item: {myItem.name}</ModalHeader>
    } else {
        renderSubmit = <Button color="primary" key="add" type="submit" block>Add Item</Button>
        cancel = <Button type="button" key="canceladd" onClick={toggle} block>Cancel Add</Button>
        formHeader = <ModalHeader key="addhead">Add a New Item</ModalHeader>
    }
    return (
        <><Button color="primary" onClick={toggle}>Add New Item</Button>
        <Modal isOpen={modal} toggle={toggle} className="modelform">
            {formHeader}
            <ModalBody>
            <Form onSubmit={handleSubmit}>
                <Input placeholder="Item Name" value={name} 
                    type="text" onChange={({target}) => setName(target.value)} required/>
                <Input type="textarea" placeholder="Description" value={desc} 
                    onChange={({target}) => setDesc(target.value)}/>
                <Input placeholder="Item Count" value={quantity} type="number" 
                    onChange={({target}) => setCount(target.value)} required/>
                <Input placeholder="Price" value={price}
                    type="number" min=".01" step=".01" 
                    onChange={({target}) => setPrice(target.value)} required/>
                {renderSubmit}
                {cancel}
            </Form>
            </ModalBody>
        </Modal></>
    )
}

export default InventoryForm;