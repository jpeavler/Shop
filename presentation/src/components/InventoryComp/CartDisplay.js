import React, {useState, useEffect} from 'react';
import {Table, Card, CardHeader, CardBody} from 'reactstrap';

const CartDisplay = () => {
    const [cartItems, setCartItems] = useState([]);
    let cart = localStorage.getItem('Cart');
    useEffect(() => {
        getInv();
    }, []);
    const getInv = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/inventory`).then(response => response.json())
            .then(inv => {
                let invInCart = Object.assign([], inv);
                invInCart = invInCart.filter((item) => {
                    let keep = false;
                    if(cart != null) {
                        let cartParsed = JSON.parse(cart);
                        cartParsed.forEach((itemID) => {
                            if(itemID == item._id) {keep = true;}
                        })
                    }
                    return keep;
                })
                setCartItems(invInCart);
            })
    }
    const displayInv = cartItems.map((item) => {
        return (
            <tr key={item._id} className="item">
                <td className="itemname">{item.name}</td>
                <td>${item.price}</td>
            </tr>
        )
    });
    return (
        <Table striped>
        <thead><th>Product Name</th><th>Price</th></thead>
        <tbody>{displayInv}</tbody>
        </Table>
    )
}

export default CartDisplay;