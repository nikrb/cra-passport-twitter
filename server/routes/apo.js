const express = require('express');
const passport = require( 'passport');

const router = new express.Router();

router.get( "/login", function(req, res, next) {
  console.log( "twitter login")
  return passport.authenticate('twitter')(req, res, next);
});
router.get( "/callback", function(req, res, next) {
  console.log( "twitter callback:", process.env.NODE_ENV);
  const redir = process.env.NODE_ENV==="production"
    ?process.env.PROD_BASE_URL:"http://localhost:3000";
  console.log( "redir url:", redir);
  return passport.authenticate('twitter', {
    successRedirect: redir,
    failureRedirect: redir
  })(req, res, next);
});

router.get( "/user", function( req, res){
  console.log( "/apo/user :", req.user);
  res.send( req.user);
});

module.exports = router;
