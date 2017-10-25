// if( process.env.NODE_ENV !== 'production'){
  require( 'dotenv').config();
// }
process.env.PORT = process.env.PORT || 5000;

const express = require('express');
const bodyParser = require('body-parser');
const session = require( 'express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require( 'passport');

const mongoose_connection = require( './models').connect( process.env.dbUri);

const app = express();

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

require( './passport/twitter-login')();

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

// Express only serves static assets in production
// FIXME: catchall need to go at the bottom
app.use( '/', express.static('client/build'));
if (process.env.NODE_ENV === 'production') {
  console.log( "node env: production");

  app.get('/', function (req, res) {
    res.sendFile( 'client/build/index.html');
  });
  // app.get('/*', function (req, res) {
  //   res.sendFile( 'client/build/index.html');
  // });
} else {
  console.log( "node env: development");
}

app.listen( process.env.PORT, () => {
  console.log(`Find the server at [${process.env.PORT}]`); // eslint-disable-line no-console
});
