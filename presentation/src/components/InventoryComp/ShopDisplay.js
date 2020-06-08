import React, {useState, useEffect} from 'react';
import {Modal, ModalBody, ModalHeader, Button, CardDeck, Card, CardHeader, CardBody, CardFooter} from 'reactstrap';
import {isLoggedIn} from '../../config/auth';

const ShopDisplay = () => {
    const [inventory, setInv] = useState([]);
    const [filterModal, setFModal] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        getInv();
    }, []);
    const getInv = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/inventory`)
            .then(response => response.json()).then(inv => setInv(inv))
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
    const handleCart = (id, added) => {
        let changedCart = Object.assign([], cart);
        let itemIndex = inventory.findIndex((invItem) => invItem._id == id);
        let item = inventory[itemIndex];
        if(added) {
            changedCart.push(item);
        } else {
            changedCart = changedCart.filter((cartItem, index) => index != itemIndex);
        }
        setCart(changedCart);
        console.log(cart);
    }
    const displayInv = inventory.map((item) => {
        let addToCart = <Button onClick={() => handleCart(item._id, true)}>Add To Cart</Button>            //ToDo: Add conditional to determine whether to add or remove the item from cart
        if(item.isActive) {
            return (
                <Card key={item._id} className="item">
                    <CardHeader className="itemname">{item.name}</CardHeader>
                    <CardBody>
                        <p className="price">Price: ${item.price}</p>
                        <p className="quantity">Count: {item.quantity}</p>
                        <p className="description">{item.desc}</p>
                        <p className="Seller">Seller: {item.seller}</p>
                    </CardBody>
                    <CardFooter>
                        {addToCart}
                    </CardFooter>
                </Card>
            )
        }
    });
    const toggleModal = () => setFModal(!filterModal);
    return (
        <div key="inventory" className="inventory">
            <h2>Marketplace</h2>
            <Button color="primary" className="topbtn" onClick={() => toggleModal()}>Display Settings</Button>
            <Modal key="filter" isOpen={filterModal} toggle={toggleModal} className="modaltoggle">
                <ModalHeader>Sort and Hide Options</ModalHeader>
                <ModalBody>
                    <Button color="primary" onClick={() => handleSort("quantity")} block>Sort by Count</Button>
                    <Button color="primary" onClick={() => handleSort("price")} block>Sort by Price</Button>
                    <Button color="secondary" onClick={() => toggleModal()} block>Close</Button>
                </ModalBody>
            </Modal>
            <CardDeck className="inventorydeck">{displayInv}</CardDeck>
        </div>
    )
}
export default ShopDisplay;