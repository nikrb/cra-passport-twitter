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

app.use(function(req, res, next){
  console.log( `request: protocol [${req.protocol}] host [${req.hostname}]
    url [${req.url}]`);
  next();
});

app.use( passport.initialize());
app.use( passport.session());

require( './passport/twitter-login')();

app.use(function(req, res, next){
  if( req.user){
    console.log( `request user [${req.user.name}]`);
  } else {
    console.log( "request user is undefined");
  }
  next();
});

const apo_routes = require( './routes/apo');
app.use( "/apo", apo_routes);


if (process.env.NODE_ENV === 'production') {
  app.use( '/', express.static( 'client/build'));

  app.get('/*', function (req, res) {
    res.sendFile( 'index.html');
  });
}

app.listen( process.env.PORT, () => {
  console.log(`Find the server at [${process.env.PORT}]`); // eslint-disable-line no-console
});
