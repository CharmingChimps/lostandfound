const db = require('../../../db/config');

const objectCompare = (object1, object2) => {
  let results = 0;
  for (const key in object2) {
    if (object1[key] === object2[key]) {
      results += 1;
    }
  }
  return results >= 3;
};

module.exports = (item, status, callback) => {
  db[status].find({ returned: false })
    .then((data) => {
      item.matches = [];
      data.forEach((object) => {
        if (item.location === object.location && item.name === object.name && objectCompare(item.description, object.description)) {
          item.matches.push(object);
          db[status].update(object, { $push: item });
        }
      });
      callback(item);
    });
};
