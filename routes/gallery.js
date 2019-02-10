const express = require('express');
const router = express.Router();
const knex = require('../db');
const Photo = require('../db/models/Photo');
const User = require('../db/models/User');

//AUTHENTICATION
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { next(); }
  else {
    req.flash('error', 'You don\'t have authentication! Please log in');
    res.redirect('/login');
  }
}

//ROUTES

router.get('/', (req, res) => {
  Photo.fetchAll()
    .then(photos => {
      let attributes = [];
      let attribute = [];
      console.log(photos.attributes)

      photos.map(photo => {
        attributes.push(photo.attributes);
        attribute.push(photo.attributes);
      });
      attribute = attribute.splice(0, 1);
      attributes = attributes.slice(1)

      let data = {
        attribute: attribute,
        attributes: attributes
      };
      console.log(data)
      res.status(200);
      res.render('templates/index', data);
    });
});

router.get('/new', isAuthenticated, (req, res) => {
  res.status(200);
  res.render('templates/new');
});

router.get('/:id', (req, res) => {
  let id = Number(req.params.id);

  Photo.fetchAll()
    .then(photos => {
      let attributesB = [];

      photos.map(photos => {
        attributesB.push(photos.attributes);
      })
      // attributesB = attributesB.splice(1);

      while (attributesB.length < 3) {
        let randomPhotoIndex = Math.floor(Math.random() * photos.length) + 1;
        let photoB = photos.models.slice(randomPhotoIndex, randomPhotoIndex + 1);
        console.log(randomPhotoIndex)
        console.log('photoB', photoB)
        console.log(photoB[0].attributes)

        if (photoB.length > 0 && photoB[0].attributes.id !== id) {
          attributesB.push(photoB[0].attributes);
        }
      }

      Photo.where({ id: id })
        .fetchAll()
        .then(photo => {
          let attributes = [];

          photo.map(photo => {
            attributes.push(photo.attributes);
          })
          let data = {
            attributes: attributes,
            attributesB: attributesB
          }
          res.render('templates/gallery', data)
        })
    });
});

router.get('/:id/edit', isAuthenticated, (req, res) => {
  let id = Number(req.params.id);

  return Photo
    .where({ id: id })
    .fetchAll()
    .then(photo => {
      console.log(photo.attributes)
      let attribute = [];

      photo.map(photo => {
        attribute.push(photo.attributes)
      });

      let photoUser = photo.attributes.user_id;

      if (photoUser !== req.user.id) {
        req.flash('error', 'You dont have authentication to edit photos that aren\'t yours');
        res.redirect(`/gallery/${id}`)
      }
      // res.status(200);
      res.render('templates/edit', attribute);
    });
});

router.post('/', isAuthenticated, (req, res) => {
  let body = req.body;

  Photo.forge({
    author: body.author,
    title: body.title,
    link: body.link,
    description: body.description
  })
    .save(null, { method: 'insert' })
    .then(() => {
      res.redirect('/gallery')
    })
});

router.put('/:id', isAuthenticated, (req, res) => {
  let id = Number(req.params.id);
  let body = req.body

  return Photo.where({ id: id })
    .save(body, { patch: true })
    .then(() => {
      res.redirect(`/gallery/${id}`)
    })
    .catch(() => {
      res.redirect('gallery/edit')
    })
});

router.delete('/:id', isAuthenticated, (req, res) => {
  let id = Number(req.params.id);
  let body = req.body
  let photoUser = photo.attributes.user_id;

  if (photoUser !== req.user.id) {
    req.flash('error', 'You dont have authentication to delete photos that aren\'t yours');
    res.redirect(`/gallery/${id}`)
  }


  return Photo.where({ id: id })
    .destroy(body, { require: true })
    .then(() => {
      res.redirect('/gallery')
    })
});



module.exports = router;