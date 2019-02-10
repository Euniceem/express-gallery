const bookshelf = require('./bookshelf');

class Photo extends bookshelf.Model {
  get tableName() { return 'photos'; }
  get timestamps() { return true; }

  users() {
    return this.belongsTo('User')
  }

}

module.exports = bookshelf.model('Photo', Photo);