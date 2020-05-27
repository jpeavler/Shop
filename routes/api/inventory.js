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

//Post router
router.post('/', async function(req, res) {
    try {
        const newItem = await addItem(req.body);
        res.send(newItem);
    } catch(err) {
        if(err.error) {
            res.status(400).send(err);
        } else {
            console.log(err);
            res.status(500).send('Internal Server issue, check logs');
        }
    }
});

//Put router
router.put('/:id', async function(req, res) {
    try {
        const updatedItem = await updateItem(req.params.id, req.body);
        res.send(updatedItem);
    } catch(err) {
        if(err.error) {
            res.status(400).send(err);
        } else {
            console.log(err);
            res.status(500).send("Internal Server issue, check logs");
        }
    }
});

module.exports = router;