const express = require('express');
const cors = require('cors');

const restricted = require('./middleware/restricted.js');

const authRouter = require('./auth/authRouter.js');
const usersRouter = require('./users/usersRouter.js');

const server = express();

server.use(cors());
server.use(express.json());
server.use('/api/auth', authRouter);
server.use('/api/users', restricted, usersRouter);

module.exports = server;
