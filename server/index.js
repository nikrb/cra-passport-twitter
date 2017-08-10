const express = require('express');
const bodyParser = require('body-parser');
const passport = require( 'passport');
require( 'dotenv').config();
require( './server/models').connect( process.env.dbUri);
const app = express();

app.set('port', (process.env.port || 8080));
app.use('/', express.static(process.cwd() + '/public'));
app.use( bodyParser.urlencoded( {extended: false}));
app.use( passport.initialize());

const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
