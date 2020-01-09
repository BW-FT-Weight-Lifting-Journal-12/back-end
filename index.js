// const server = require('./api/server.js');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

// const authenticate = require('../auth/auth-middleware.js');
const authRouter = require('./auth/auth-router');
const journalRouter = require('./auth/journal-router');
const usersRouter = require('./auth/users-router');
const usersJournalRouter = require ('./auth/usersjournal-router');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/journal', journalRouter);
server.use('/api/users', usersRouter);
server.use('/api/usersjournal', usersJournalRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});

server.get('/', (req, res) => {
    res.send("It's alive!");
});

module.exports = server;