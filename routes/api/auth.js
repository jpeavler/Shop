const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {registerUser} = require('../../dal/auth');

const salt = process.env.SALT;

//Post router
router.post('/register', function(req, res) {
    try {
        const saltRounds = +salt;
        let body = req.body;
        const myPlaintextPassword = req.body.password;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) {
                throw err;
            }
            bcrypt.hash(myPlaintextPassword, salt, async function(err, hash) {
                if(err) {
                    throw err;
                }
                body.password = hash;
                const user = await registerUser(req.body);
                res.send(user);
            });
        });
    } catch(err) {
        if(err.error) {
            res.status(400).send(err);
        } else {
            console.log(err);
            res.status(500).send('Internal Server issue, check logs');
        }
    }
});

module.exports = router;