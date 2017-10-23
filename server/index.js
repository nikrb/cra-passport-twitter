if( process.env.NODE_ENV !== 'production'){
  require( 'dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const session = require( 'express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require( 'passport');

const mongoose_connection = require( './models').connect( process.env.dbUri);

const app = express();

const PORT = process.env.PORT || 5000;

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  console.log( "node env: production");
  app.use( '/', express.static('client/build'));

  app.get('/', function (req, res) {
    res.sendFile( 'client/build/index.html');
  });
  // app.get('/*', function (req, res) {
  //   res.sendFile( 'client/build/index.html');
  // });
} else {
  console.log( "node env: development");
}

app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: "mysecretsessionpassword",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose_connection })
}));

app.use( passport.initialize());
app.use( passport.session());

const twitter_strategy = require( './passport/twitter-login');
passport.use( 'twitter', twitter_strategy);

console.log( "setting up router");
const apo_routes = require( './routes/apo');
app.use( "/apo", apo_routes);


// const localSignupStrategy = require('./passport/local-signup');
// const localLoginStrategy = require('./passport/local-login');
// passport.use('local-signup', localSignupStrategy);
// passport.use('local-login', localLoginStrategy);
//
// const authCheckMiddleware = require('./middleware/auth-check');
// app.use('/api', authCheckMiddleware);

// const authRoutes = require('./routes/auth');
// const apiRoutes = require('./routes/api');
// app.use('/auth', authRoutes);
// app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Find the server at [${PORT}]`); // eslint-disable-line no-console
});
