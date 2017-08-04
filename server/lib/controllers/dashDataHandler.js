const { user, lost, found } = require('../../../db/config');
const { promisify } = require('bluebird');
const { getUserId } = require('../utils');

const findAllLostPromise = promisify(lost.find.bind(lost));
const findAllFoundPromise = promisify(found.find.bind(found));

module.exports = (req, res) => {
  const dashData = {};
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

