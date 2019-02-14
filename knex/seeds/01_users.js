const bcrypt = require('bcryptjs');
const saltRounds = 12;


exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return new Promise((resolve, reject) => {

        bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) {
            console.log(err);
            reject(err)
          }

          bcrypt.hash('mineunice', salt, function (err, hash) {
            if (err) {
              console.log(err);
              reject(err);
            }

            return knex('users').insert([
              {
                username: 'eunicee',
                password: hash
              },
            ])
              .then(resolve);
          });
        });
      })
    })
}
