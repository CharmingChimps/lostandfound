const { user, lost, found } = require('../../../db/config');
const { promisify } = require('bluebird');

const findOneUserPromise = promisify(user.findOne.bind(user));
const findAllLostPromise = promisify(lost.find.bind(lost));
const findAllFoundPromise = promisify(found.find.bind(found));

function getUserId(username) {
  return findOneUserPromise({ username })
    .then(match => match._id);
}

module.exports = (req, res) => {
  const dashData = {};
  console.log('getting dash data ...');
  console.log('session:', req.session);
  getUserId(req.session.user)
    .then(userId => Promise.all([
      findAllLostPromise({ user_id: userId }),
      findAllFoundPromise({ user_id: userId }),
    ]))
    .then((dataArr) => {
      dashData.lost = dataArr[0];
      dashData.found = dataArr[1];
      res.send(dashData);
    });
};
