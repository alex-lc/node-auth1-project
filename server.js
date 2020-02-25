const express = require('express');
const cors = require('cors');
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session); // remember to curry and pass the session
const knex = require('./data/dbConfig'); // needed for storing sessions in the database

const restricted = require('./middleware/restricted.js');

const authRouter = require('./auth/authRouter.js');
const usersRouter = require('./users/usersRouter.js');

const server = express();

const sessionConfig = {
    name: 'c',
    secret: 'Top secret',
    resave: false,
    saveUninitialized: true, // related to GDPR compliance
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false, // should be true in production
        httpOnly: true, // true means JS can't touch the cookie
    },
    // remember the new keyword
    store: new KnexStore({
        knex,
        tablename: 'sessions',
        createTable: true,
        sidfieldname: 'sid',
        clearInterval: 1000 * 60 * 15,
    })
}

server.use(cors());
server.use(express.json());
server.use(session(sessionConfig)); // turn on the session middleware
// at this point there is a req.session object created by express-session
server.use('/api/auth', authRouter);
server.use('/api/users', restricted, usersRouter);

server.get('/', (req, res) => {
    // console.log(req.session);
    res.json({ we: 'online' });
})

module.exports = server;
