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
  let id = req.params.id;

  Photo.where({ id: id }).fetch()
    .then((photo) => {
      const attributesA = photo.attributes;
      let attributesB = [];

      Photo.fetchAll()
        .then((photos) => {
          while (attributesB.length < 3) {
            // let photoB = photos.

            let index = Math.floor(Math.random() * (photos.length + 1));
            let photoB = photos.models.slice(index, index + 1);
            // photoB.splice(1, 0);
            console.log('randommm', photoB)
            console.log('PhotoBBB', photoB[0].attributes)

            if (photoB.length > 0 && photoB[0].attributes.id !== id) {
              attributesB.push(photoB[0].attributes);
            }
          }

          const data = {
            id: attributesA.id,
            title: attributesA.title,
            author: attributesA.author,
            link: attributesA.link,
            description: attributesA.description,
            attributesB: attributesB,
            message: req.flash('error')
          };
          // console.log('DATAAAAAAAAA:', data)

          // res.status(200);
          return res.render('templates/gallery', data)
        });
    });
});


router.get('/:id/edit', isAuthenticated, (req, res) => {
  let id = Number(req.params.id);

  Photo.where({ id: id })
    .fetch()
    .then(photo => {
      let photoUser = photo.attributes.user_id;
      let photoAttribute = photo.attributes;

      if (photoUser !== req.user.id) {
        req.flash('error', 'You dont have authentication to edit photos that aren\'t yours');
        return res.redirect(`/gallery/${id}`)
      }
      let attribute = {
        id: photoAttribute.id,
        title: photoAttribute.title,
        author: photoAttribute.author,
        link: photoAttribute.link,
        description: photoAttribute.description
      }

      // res.status(200);
      return res.render('templates/edit', attribute);
    });
});

router.post('/', isAuthenticated, (req, res) => {
  let body = req.body;

  Photo.forge({
    user_id: req.user.id,
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
    .save({
      user_id: req.user.id,
      title: body.title,
      link: body.link,
      author: body.author,
      description: body.description
    }, { patch: true })
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

  Photo.where({ id: id })
    .fetch()
    .then(photo => {
      let photoUser = photo.attributes.user_id;

      if (photoUser !== req.user.id) {
        req.flash('error', 'You dont have authentication to delete photos that aren\'t yours');
        res.redirect(`/gallery/${id}`)
      }

      new Photo({ id: id })
        .destroy(body, { require: true })
        .then(() => {
          res.redirect('/gallery')
        })
    })
});



module.exports = router;