import React, {useState, useEffect} from 'react';

const CartDisplay = () => {
    const [inventory, setInv] = useState([]);
    let cart = localStorage.getItem('Cart');
    useEffect(() => {
        getInv();
    }, []);
    const getInv = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/inventory`)
            .then(response => response.json()).then(inv => {
                let invInCart = Object.assign([], inv);
                invInCart = invInCart.filter((item) => {
                    let keep = false;
                    if(cart != null) {
                        let cartParsed = JSON.parse(cart);
                        cartParsed.forEach((itemID) => {
                            console.log("itemID: ", itemID);
                            console.log("item._id: ", item._id);
                            if(itemID == item._id) {
                                console.log("It happened")
                                keep = true;
                            }
                        })
                    }
                    return keep;
                })
                setInv(invInCart);
            })
    }
    console.log("Inventory: ", inventory);
    return (
        <p>Cart: {cart}</p>
    )
}

export default CartDisplay;