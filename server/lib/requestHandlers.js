const db = require('../../db/config');
const { matchLostItem, matchFoundItem } = require('./controllers/matchhandler');
const { getUserId } = require('./utils');
const { promisify } = require('bluebird');

const createLostPromise = promisify(db.lost.create.bind(db.lost));
const createFoundPromise = promisify(db.found.create.bind(db.found));

exports.postLostItem = (req, res) => {
  // req.session.user = req.session.user || 'frank';
  const item = req.body;
  getUserId(req.session.user)
    .then((userId) => {
      item.user_id = userId;
      createLostPromise(item)
        .then(() => matchLostItem(item))
        .then(() => res.send('post success'));
    });
};

exports.postFoundItem = (req, res) => {
  // req.session.user = req.session.user || 'frank';
  const item = req.body;
  getUserId(req.session.user)
    .then((userId) => {
      item.user_id = userId;
      createFoundPromise(item)
        .then(found => matchFoundItem(found))
        .then(() => res.send('post success'));
    });
};

exports.getStatus = (req, res) => {
  if (req.session.user) res.send(true);
  else res.send(false);
};


exports.postMessages = (req, res) => {
  // user id
  const user_id = req.body.user_id;
  // to user id
  const to_user_id = req.body.to_user_id;
  // req.body = message
  const message = req.body.text;
  const messageObj = {
    user_id: user_id,
    text: message,
    to_user_id: to_user_id
  }
  // send to server
  //  console.log('INSIDE POST MESSAGE: ', req.body.text);
  db.messages.create(messageObj, (err) => {
    if (err) throw err;
    //  must still write here check data base as a call back
  });
  res.send('success on post messages updated');
};

exports.getMessages = (req, res) => {
  // user id
  const user_id = req.query.user_id;
  // to user id
  const to_user_id = req.query.to_user_id;
  // req.body = message
  db.messages.find({ $or: [
    {
      user_id: to_user_id,
      to_user_id: user_id,
    },
    {
      user_id: to_user_id,
      to_user_id: user_id,
    },
  ] })
    .limit(20)
    .sort({ date: 'desc' })
    .then((items) => {
      console.log('items', items,
        '\n user_id', user_id,
        '\n to_user_id', to_user_id);
      res.send(items);
    });

  // console.log('getMessages', req.body);
  // getUserId(req.session.user, (userId) => {
  //   getUserId(req.query.to_user, (toUserId) => {
  //     db.messages.find({ user_id: userId, to_user_id: toUserId })
  //       .then(res.send.bind(res));
  //   });
  //   //WAITING FOR WALTER
  // });
};

exports.getMatches = (req, res) => {
  req.session.user = req.session.user || 'barney';
  getUserId(req.session.user, (userId) => {
    db.found.find({ user_id: userId })
      .then((data) => {
        data = data.filter(item => item.matches.length > 0 && item.matches.found === false);
        res.send(data);
      });
  });
};
