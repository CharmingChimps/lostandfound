const { user, lost, found } = require('../../db/config');
const { promisify } = require('bluebird');

const findOneUserPromise = promisify(user.findOne.bind(user));

exports.isSignedIn = (req, res) => {
  if (req.session.user) return true;
  return false;
};

exports.createNewSession = (req, res, name) => {
  req.session.regenerate((err) => {
    if (err) throw err;
    req.session.user = name;
    res.send('good session');
  });
};

exports.destroySession = (req, res) => {
  req.session.destroy(res.send.bind(res));
};

exports.getUserId = username =>
  findOneUserPromise({ username })
    .then(match => match._id);

