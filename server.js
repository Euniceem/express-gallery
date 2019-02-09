const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const gallery = require('./routes/gallery');
const userRoute = require('./routes/user');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const redis = require('connect-redis')(session);

const User = require('./db/models/User');
const PORT = process.env.PORT || 8080;
const ENV = process.env.NODE_ENV || 'development';
const SESSION_SECRET = process.env.SESSION_SECRET || 'keyboard cat';


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({
  store: new redis({ url: 'redis://redis-server:6379', logErrors: true }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: ENV === 'production' }

}));
//PASSPORT 
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use('/gallery', gallery);
app.use('/', userRoute);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main.hbs'
}));



// after login
passport.serializeUser((user, done) => {
  console.log('serializing');
  return done(null, {
    id: user.id,
    username: user.username
  });
});

// after every request
passport.deserializeUser((user, done) => {
  console.log('deserializing');
  return new User({ id: user.id }).fetch()
    .then(dbUser => {
      // dbUser = dbUser.toJSON();
      console.log(dbUser)
      return done(null, {
        id: user.id,
        username: user.username
      });
    })
    .catch((err) => {
      console.log(err);
      return done(err);
    });
});


passport.use(new LocalStrategy(function (username, password, done) {
  return new User({ username: username })
    .fetch()
    .then(user => {
      user = user.toJSON();
      console.log(user)

      if (user === null) {
        return done(null, false, { message: 'bad username or password' });
      }
      else {
        bcrypt.compare(password, user.password)
          .then((res) => {
            if (res) { return done(null, user); }
            else {
              return done(null, false, { message: 'bad username or password' });
            }
          });
      }
    })
    .catch(err => {
      console.log('error: ', err);
      return done(err); //500 error
    });
}));


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  console.log('This is docker!')
});