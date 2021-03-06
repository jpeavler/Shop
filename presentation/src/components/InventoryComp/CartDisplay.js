import React, {useState, useEffect} from 'react';
import {Table} from 'reactstrap';

const CartDisplay = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    let cart = localStorage.getItem('Cart');
    useEffect(() => {
        getInv();
    }, []);
    useEffect(() => {
        getTotal();
    }, [cartItems])
    const getInv = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/inventory`).then(response => response.json())
        .then(inv => {
            let invInCart = Object.assign([], inv);
            invInCart = invInCart.filter((item) => {
                let keep = false;
                if(cart != null) {
                    let cartParsed = cart.split(",");
                    cartParsed.forEach((itemID) => {
                        if(itemID === item._id) {keep = true;}
                    })
                }
                return keep;
            })
            setCartItems(invInCart);
        });
    }
    const getTotal = () => {
        let myTotal = 0;
        cartItems.forEach((item) => {
            myTotal = myTotal + parseFloat(item.price);
        });
        myTotal = (Math.ceil(myTotal * 100)/100).toFixed(2);
        setTotal(myTotal);
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
        <thead><tr><th>Product Name</th><th>Price</th></tr></thead>
        <tbody>
            {displayInv}
            <tr><td>Total</td><td>${total}</td></tr>
        </tbody>
        </Table>
    )
}

export default CartDisplay;