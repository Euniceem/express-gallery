const bookshelf = require('./bookshelf');

class User extends bookshelf.Model {
  get tableName() { return 'users'; }
  get timestamps() { return true; }

}

module.exports = bookshelf.model('Users', User);