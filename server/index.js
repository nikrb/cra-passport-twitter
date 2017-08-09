const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const app = express();
const bodyParser = require('body-parser');

var url = 'mongodb://localhost:27017/recipes';
MongoClient.connect(url, function(err, db) {
  if( err){
    throw new Error( "mongo connect failed");
  } else {
    console.log( "connected to db");
  }

  app.set('port', (process.env.port || 8080));
  app.use('/', express.static(process.cwd() + '/public'));


  app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
  });
});
