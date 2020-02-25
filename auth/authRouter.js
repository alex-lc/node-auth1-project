const express = require('express');
const bcrypt = require('bcryptjs');

const Auth = require('./authModel.js');
const Users = require('../users/userModel');

const router = express.Router();

/* POST to register a user */
router.post('/register', (req, res) => {

    let newUser = req.body;

    const hash = bcrypt.hashSync(newUser.password, 8);

    newUser.password = hash;

    Auth.add(newUser)
        .then(u => {
            console.log(req.session);
            req.session.loggedIn = true;
            res.status(201).json(newUser);
        })
        .catch(e => {
            res.status(400).json({ error: 'The user could not be created.' });
        })
});

/* POST to login a user */
router.post('/login', (req, res) => {

    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                console.log(req.session);
                req.session.loggedIn = true;
                req.session.username = user.username;

                res.status(200).json({ message: `You have successfully logged in, ${user.username}` });
            }
            else {
                res.status(401).json({ error: 'Invalid credentials. Please try again.' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

/* Logout */
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ error: 'Something went wrong.' });
            }
            else {
                res.status(200).json({ error: 'Successfully logged out.' })
            }
        });
    }
    else {
        res.status(200).json({ error: 'Sorry about that.' })
    }
})


module.exports = router;