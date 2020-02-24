const express = require('express');

const Users = require('./userModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Users.getUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(404).json({ error: 'List of users could not be found.' });
        })
});

module.exports = router;