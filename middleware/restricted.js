const bcrypt = require('bcryptjs');

const Users = require('../users/userModel');

module.exports = function restricted(req, res, next) {

    let { username, password } = req.headers;

    if (username && password) {
        Users.findBy({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    next();
                }
                else {
                    res.status(401).json({ error: 'Invalid credentials. Try again.' });
                }
            })
            .catch(({ name, message, stack }) => {
                res.status(500).json({ name, message, stack });
            })
    }
    else {
        res.status(400).json({ error: 'Please provide your credentials.' });
    }
}