const express = require('express');
const router = express.Router();
const knex = require('../db');
const Photo = require('../db/models/Photo');
const User = require('../db/models/User');

//AUTHENTICATION
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { next(); }
  else { res.redirect('/'); }
}

//ROUTES

router.get('/', (req, res) => {
  Photo.fetchAll()
    .then(photos => {
      let attributes = [];
      let attribute = [];

      photos.map(photo => {
        attributes.push(photo.attributes);
        attribute.push(photo.attributes);
      });
      attribute = attribute.splice(0, 1);
      attributes = attributes.slice(1)

      let data = {
        attribute: attribute,
        attributes: attributes
      }
      res.render('templates/index', data)
    })
});

router.get('/new', isAuthenticated, (req, res) => {
  res.render('templates/new')
});

router.get('/:id', (req, res) => {
  let id = Number(req.params.id);

  Photo.fetchAll()
    .then(photos => {
      let attributesB = [];

      photos.map(photos => {
        attributesB.push(photos.attributes);
      })
      attributesB = attributesB.splice(1, 3);

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

router.get('/:id/edit', (req, res) => {
  let id = Number(req.params.id);

  return Photo.where({ id: id })
    .fetchAll()
    .then(photo => {
      let attribute = [];

      photo.map(photo => {
        attribute.push(photo.attributes)
      })
      console.log(attribute)
      res.render('templates/edit', attribute)
    })
});

router.post('/', isAuthenticated, (req, res) => {
  let body = req.body;

  Photo.forge({
    author: body.author,
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

  return Photo.where({ id: id })
    .destroy(body, { require: true })
    .then(() => {
      res.redirect('/gallery')
    })
});



module.exports = router;