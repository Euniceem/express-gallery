const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const gallery = require('./routes/gallery');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use('/gallery', gallery);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.set('view engine', '.hbs');
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main.hbs'
}));

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});