const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { promisify } = require('bluebird');

const hashPromise = promisify(bcrypt.hash.bind(bcrypt));

const Schema = mongoose.Schema;


const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  name: String,
});

UserSchema.pre('save', function (next) {
  const model = this;
  hashPromise(model.password, null, null)
    .then((hash) => {
      model.password = hash;
      next();
    });
});

const User = mongoose.model('User', UserSchema);
module.exports.user = User;

const LostSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  location: String,
  name: String,
  matches: Array,
  description: {
    brand: String,
    color: String,
    condition: Number,
    size: String,
  },
  returned: Boolean,
});

const Lost = mongoose.model('Lost', LostSchema);
module.exports.lost = Lost;

const FoundSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  location: String,
  name: String,
  matches: Array,
  description: {
    brand: String,
    color: String,
    condition: Number,
    size: String,
  },
  returned: Boolean,
});

const Found = mongoose.model('Found', FoundSchema);
module.exports.found = Found;

const MatchSchema = new Schema({
  found_id: { type: Schema.Types.ObjectId, ref: 'Found' },
  lost_id: { type: Schema.Types.ObjectId, ref: 'Lost' },
});

const Match = mongoose.model('Match', MatchSchema);
module.exports.match = Match;

const MessagesSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  text: String,
  date: { type: Date, default: Date.now },
  to_user_id: { type: Schema.Types.ObjectId, ref: 'User' },
});

const messages = mongoose.model('Messages', MessagesSchema);
module.exports.messages = messages;
