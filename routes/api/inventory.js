const express = require('express');
const router = express.Router();
const {
    getInventory,
    getItemById,
    addItem,
    updateItem,
    updateItemValues,
    deleteItem
} = require('../../dal/inventory')

//Get routers
router.get('/', async function(req, res) {
    try{
        const inventory = await getInventory();
        res.send(inventory);
    } catch(err) {
        console.log(err);
        res.status(500).send('Internal Server issue, check logs');
    }
});

module.exports = router;