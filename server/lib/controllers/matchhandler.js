const { lost, found } = require('../../../db/config');
const { promisify } = require('bluebird');

const findAllFoundPromise = promisify(found.find.bind(found));
const findAllLostPromise = promisify(lost.find.bind(lost));

exports.matchLostItem = item =>
  findAllFoundPromise({
    returned: false,
    name: item.name,
    location: item.location,
  })
    .then((matches) => {
      if (matches.length < 1) return;
      const newItemMatches = item.matches.slice();
      matches.forEach((match) => {
        const newMatches = match.matches.slice();
        newMatches.push(item);
        found.update({ _id: match._id }, { matches: newMatches }, () => '');
        newItemMatches.push(match);
      });
      lost.update({ _id: item._id }, { matches: newItemMatches }, () => '');
    });

exports.matchFoundItem = item =>
  findAllLostPromise({
    returned: false,
    name: item.name,
    location: item.location,
  })
    .then((matches) => {
      if (matches.length < 1) return;
      const newItemMatches = item.matches.slice();
      matches.forEach((match) => {
        const newMatches = match.matches.slice();
        newMatches.push(item);
        lost.update({ _id: match._id }, { matches: newMatches }, () => '');
        newItemMatches.push(match);
      });
      found.update({ _id: item._id }, { matches: newItemMatches }, () => '');
    });
