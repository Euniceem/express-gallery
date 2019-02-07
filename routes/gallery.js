const express = require('express');
const router = express.Router();
const knex = require('../db');
const Photo = require('../db/models/Photo')

router.get('/', (req, res) => {
  Photo.fetchAll()
    .then(photos => {
      let attributes = [];

      photos.map(photo => {
        attributes.push(photo.attributes);
      });
      console.log(attributes)
      res.render('templates/index', { photos: attributes })
    })
});

router.get('/new', (req, res) => {
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
      console.log("BBBBBBBB::::", attributesB)

      Photo.where({ id: id })
        .fetchAll()
        .then(photo => {
          let attributes = [];

          photo.map(photo => {
            attributes.push(photo.attributes);
          })
          console.log("Attributes:", attributes)

          let data = {
            attributes: attributes,
            attributesB: attributesB
          }
          console.log("DATA", data)
          res.render('templates/gallery', data)
        })
    })
})

// knex.delete('photos')
//   .select('id', 'author', 'link', 'description')
//   .whereNot('id', id)
//   .then((photos) => {
//     console.log(photos)
//     res.render('templates/gallery', photos.splice(0, 3))
//   })

// });

// router.get('/:id/edit', (req, res) => {
//   let id = Number(req.params.id);

//   knex('photos')
//     .select('id', 'author', 'link', 'description')
//     .where('id', id)
//     .then((photos) => {
//       res.render('templates/edit', photos[0])
//     })
// });

// router.post('/', (req, res) => {
//   knex('photos')
//     .insert({
//       author: req.body.author,
//       link: req.body.link,
//       description: req.body.description
//     })
//     .then(() => {
//       res.redirect('/gallery')
//     })
// });

// router.put('/:id', (req, res) => {
//   let id = Number(req.params.id);
//   let body = req.body

//   knex('photos')
//     .where('id', id)
//     .update(body)
//     .then(() => {
//       res.redirect(`gallery/${id}`)
//     })
//     .catch(() => {
//       res.redirect('gallery/edit')
//     })
// });

// router.delete('/:id', (req, res) => {
//   let id = Number(req.params.id);

//   knex('photos')
//     .where('id', id)
//     .delete()
//     .then(() => {
//       res.redirect('/gallery')
//     })
// });



module.exports = router;