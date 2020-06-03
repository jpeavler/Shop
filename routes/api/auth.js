const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {registerUser, getUserByValue} = require('../../dal/auth');

const salt = process.env.SALT;
const privateKey = process.env.PRIVATE_KEY;

//Get router
router.get('/user', async function(req, res) {
    try {
        const dbUser = await getUserByValue('username', req.body.username);
        res.send(dbUser);
    } catch(err) {
        console.log(err);
        res.status(500).send('Internal Server issue, check logs');
    }
});

//Post Login router
router.post('/login', async function(req, res) {
    try {
        const dbUser = await getUserByValue('username', req.body.username);
        if(dbUser.length === 0) {
            res.status(401).send('Login Failed');
            console.log(`${req.body.username} doesn't exist`);
        } else if(dbUser.length > 1) {
            res.status(500).send('Login Failed')
            console.log(`${req.body.username} exists more than once`)
        } else {
            bcrypt.compare(req.body.password, dbUser[0].password, function(err, result) {
                if(err) {throw err;}
                if(!result) {
                    res.status(401).send('Login Failed');
                    console.log(`Provided password for ${req.body.username} doesn't match`);
                } else {
                    let expire = new Date(Date.now());      //makes the web token expire in a week
                    expire.setDate(expire.getDate() + 7);
                    jwt.sign({expires: expire, _id: dbUser[0]._id }, privateKey, { algorithm: 'HS512' }, function(err, token) {
                        if(err) {throw err;}
                        console.log(token);
                        res.set('authentication', token);
                        res.set('Access-Control-Expose-Headers', 'authentication');
                        res.send();
                    });
                }
            });
        }
    } catch(err) {
        console.log(err);
        res.status(500).send('Internal Server issue, check logs');
    }
})
//Post Register router
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