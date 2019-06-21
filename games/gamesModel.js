const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  remove
};

function insert(user) {
  return db('games')
    .insert(user, 'id')
    .then(ids => {
      return db('games')
        .where({ id: ids[0] })
        .first();
    });
}

function remove(id) {
  return db('games')
    .where('id', id)
    .del();
}
