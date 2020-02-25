const db = require('../data/dbConfig.js');

module.exports = {
    getUsers,
    findBy
};

function getUsers() {
    return db('users');
}

function findBy(filter) {
    return db('users')
        .select('id', 'username', 'password')
        .where(filter);
}