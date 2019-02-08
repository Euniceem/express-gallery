const express = require('express');
const router = express.Router();
const knex = require('../db');
const User = require('../db/models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const saltRounds = 12;


//AUTHENTICATION

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { next(); }
  else { res.redirect('/login'); }
}


//METHODS
router.get('/register', (req, res) => {
  res.render('templates/register')
});

router.get('/login', (req, res) => {
  res.render('templates/login')
});

router.post('/register', (req, res) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) { console.log(err); }

    bcrypt.hash(req.body.password, salt, function (err, hash) {
      if (err) { console.log(err); }
      console.log(req.body)
      return new User({
        username: req.body.username,
        password: hash
      })
        .save()
        .then((user) => {
          console.log(user);
          res.redirect('/login');
        })
        .catch((err) => {
          console.log(err);
          return res.send('Error Creating account');
        });
    })
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/gallery',
  failureRedirect: '/login'
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});


router.get('/gallery', isAuthenticated, (req, res) => {
  console.log('req.user: ', req.user); //deserialized information
  console.log('req.user id', req.user.id);
  console.log('req.username', req.user.username);
  res.send('Successfully logged in!');
});


module.exports = router;