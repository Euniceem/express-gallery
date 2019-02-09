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
router.get('/', isAuthenticated, (req, res) => {
  res.redirect('/gallery');
});

router.get('/register', (req, res) => {

  res.status(200);
  res.render('templates/register', { message: req.flash('error') });
});

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) { return res.redirect('/gallery'); }

  res.status(200);
  res.render('templates/login', { message: req.flash('error') });
});

router.post('/register', (req, res) => {
  User.where({ username: req.body.username })
    .fetch()
    .then(dbUser => {
      if (dbUser) {
        req.flash('error', 'Username already exists choose another one')
        return res.redirect('/register');
      }

      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          console.log(err);
          res.status(500);
          res.send(err)
        }

        bcrypt.hash(req.body.password, salt, function (err, hash) {
          if (err) {
            console.log(err);
            res.status(500);
            res.send(err);
          }

          return new User({
            username: req.body.username,
            password: hash
          })
            .save()
            .then((user) => {

              res.redirect('/login');
            })
            .catch((err) => {

              return res.send('Error Creating account');
            });
        })
      })
    });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/gallery',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', (req, res) => {
  req.logout();
  // res.sendStatus(200);
  res.redirect('/login')
});


router.get('/gallery', isAuthenticated, (req, res) => {
  // console.log('req.user: ', req.user); //deserialized information
  // console.log('req.user id', req.user.id);
  // console.log('req.username', req.user.username);
  res.send('Successfully logged in!');
});


module.exports = router;