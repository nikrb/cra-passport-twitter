const express = require('express');
const passport = require( 'passport');

const router = new express.Router();

router.get( "/login", function(req, res, next) {
  console.log( "twitter login")
  return passport.authenticate('twitter')(req, res, next);
});
router.get( "/callback", function(req, res, next) {
  console.log( "twitter callback");
  return passport.authenticate('twitter', {successRedirect: '/', failureRedirect: '/'})(req, res, next);
});

module.exports = router;