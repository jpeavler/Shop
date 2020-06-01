const express = require('express');
const router = express.Router();
const {
    registerUser
} = require('../../dal/auth')

//Post router
router.post('/register', async function(req, res) {
    try {
        const newItem = await registerUser(req.body);
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