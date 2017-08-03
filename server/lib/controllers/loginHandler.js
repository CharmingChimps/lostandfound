const { user } = require('../../../db/config');
const { promisify } = require('bluebird');
const { createNewSession } = require('../utils');
const bcrypt = require('bcrypt-nodejs');

const comparePromise = promisify(bcrypt.compare.bind(bcrypt));
const findOneUserPromise = promisify(user.findOne.bind(user));

module.exports = (req, res) => {
  console.log('query', req.query);
  const username = req.query.username;
  const password = req.query.password;
  findOneUserPromise({ username })
    .then((match) => {
      if (!match) {
        res.send('wrong username');
      } else {
        //console.log(match);
        comparePromise(password, match.password)
          .then((isGoodPwd) => {
            if (isGoodPwd) createNewSession(req, res, username);
            else res.send('wrong password');
          });
      }
    });
};
