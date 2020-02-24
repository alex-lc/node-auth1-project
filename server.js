const express = require('express');

const authRouter = require('./auth/authRouter.js');
const usersRouter = require('./users/usersRouter.js');

const server = express();

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

module.exports = server;
