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

router.get('/:id', async function(req, res) {
    try {
        const item = await getItemById(req.params.id);
        res.send(item);
    } catch(err) {
        if(err.error) {
            res.status(400).send(err);
        } else {
            console.log(err);
            res.status(500).send('Internal Servier issue, check logs');
        }
    }
});


module.exports = router;