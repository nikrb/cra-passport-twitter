const express = require('express');

const router = new express.Router();

router.get( "/test", function( req, res){
  res.send( {success:true, message:"test route"});
});

router.get( "/login", function(req, res, next) {
  console.log( "twitter login")
  return passport.authenticate('twitter')(req, res, next);
});
router.get( "/callback", function(req, res, next) {
  console.log( "twitter callback");
  return passport.authenticate('twitter', {successRedirect: '/', failureRedirect: '/'})(req, res, next);
});

module.exports = router;
