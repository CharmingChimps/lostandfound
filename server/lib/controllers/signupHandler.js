const { user } = require('../../../db/config');
const { promisify } = require('bluebird');
const { createNewSession } = require('../utils');

const findOneUserPromise = promisify(user.findOne.bind(user));
const createUserPromise = promisify(user.create.bind(user));

module.exports = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  findOneUserPromise({ username })
    .then((match) => {
      if (!match) {
        createUserPromise({ username, password });
        createNewSession(req, res, username);
      } else {
        res.send('username taken');
      }
    });
};
