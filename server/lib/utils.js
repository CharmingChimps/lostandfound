

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
