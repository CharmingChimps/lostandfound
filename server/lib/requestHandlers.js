const db = require('../../db/config');
const checkMatches = require('./controllers/matchhandler');

exports.postLostItem = (req, res) => {
  checkMatches(req.body, 'lost', (item) => {
    db.lost.create(item, (err) => {
      if (err) throw err;

      // must still write here check data base as a call back
    });
  });
  res.send('success on post lost item');
};

exports.postFoundItem = (req, res) => {
  checkMatches(req.body, 'found', (item) => {
    db.found.create(item, (err) => {
      if (err) throw err;

      // must still write here check data base as a call back
    });
  });
  res.send('success on post found item');
};

exports.getStatus = (req, res) => {
  if (req.session.user) res.send(true);
  else res.send(false);
};
