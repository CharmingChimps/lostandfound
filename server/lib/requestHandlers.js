const db = require('../../db/config');
const checkMatches = require('./controllers/matchhandler');

function getUserId(user, callback) {
  db.user.findOne({ username: user })
    .then((userObject) => {
      callback(userObject._id);
    });
}

exports.postLostItem = (req, res) => {
  req.session.user = req.session.user || 'frank';
  checkMatches(req.body, 'lost', (item) => {
    getUserId(req.session.user, (userId) => {
      item.user_id = userId;
      db.lost.create(item, (err) => {
        if (err) throw err;
      });
    });
  });
  res.send('success on post lost item');
};

exports.postFoundItem = (req, res) => {
  req.session.user = req.session.user || 'barney';
  checkMatches(req.body, 'found', (item) => {
    getUserId(req.session.user, (userId) => {
      item.user_id = userId;
      db.found.create(item, (err) => {
        if (err) throw err;
      });
    });
  });
  res.send('success on post found item');
};

exports.getStatus = (req, res) => {
  if (req.session.user) res.send(true);
  else res.send(false);
};


exports.postMessages = (req, res) => {
  db.messages.create(req.body, (err) => {
    if (err) throw err;

    // must still write here check data base as a call back
  });
  res.send('success on post messages');
};

exports.getMessages = (req, res) => {
  // console.log('getMessages', req.body);
  getUserId(req.session.user, (userId) => {
    getUserId(req.query.to_user, (toUserId) => {
      db.messages.find({ user_id: userId, to_user_id: toUserId })
        .then(res.send.bind(res));
    });
    //WAITING FOR WALTER
  });
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
