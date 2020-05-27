import React, {useState} from 'react';

const InventoryForm = ({refresh, myItem, id}) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [count, setCount] = useState('');
    const [price, setPrice] = useState('');

    return (
        <form>
            <input placeholder="Item Name" value={name} 
                type="text" onChange={({target}) => setName(target.value)} required/>
            <textarea placeholder="Description" value={desc} 
                onChange={({target}) => setDesc(target.value)}/>
            <input placeholder="Item Count" value={count} type="number" 
                onChange={({target}) => setCount(target.value)} required/>
            <input placeholder="Price" value={price}
                type="number" min=".01" step=".01" 
                onChange={({target}) => setPrice(target.value)} required/>
            <input type="submit" value="Add Item"/>
        </form>
    )
}

export default InventoryForm;