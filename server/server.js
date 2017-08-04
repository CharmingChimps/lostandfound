const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { router } = require('./lib/routes');
const session = require('express-session');


mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds135983.mlab.com:35983/hrnyc9chimps', {
  useMongoClient: true,
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'alakazam',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static('./client'));

app.use('/', router);

const port = process.env.PORT || 8000;

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Listening on ${port}`);
});
