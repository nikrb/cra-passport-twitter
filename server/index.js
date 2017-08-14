const express = require('express');
const bodyParser = require('body-parser');
const passport = require( 'passport');
require( 'dotenv').config();
require( './models').connect( process.env.dbUri);
const app = express();

// cloud9 requires port 8080
var port = 8081;
if( process.env.NODE_ENV === 'production'){
  console.log( "production environment");
  port = 8080;
} else {
  // react-scripts starts dev server up on 3000
  console.log( "development environment");
}

app.set('port', port); // (process.env.port || 8080));
// app.use('/', express.static(process.cwd() + '/public'));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use( '/', express.static('client/build'));

  app.get('/', function (req, res) {
    res.sendFile( 'client/build/index.html');
  });
}

app.use( bodyParser.json());
app.use( passport.initialize());

const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

const authCheckMiddleware = require('./middleware/auth-check');
app.use('/api', authCheckMiddleware);

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
