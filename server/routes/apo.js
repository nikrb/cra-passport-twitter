const express = require('express');
const passport = require( 'passport');

const router = new express.Router();

router.get( "/login", function(req, res, next) {
  console.log( "twitter login")
  return passport.authenticate('twitter')(req, res, next);
});
router.get( "/callback", function(req, res, next) {
  console.log( "twitter callback:", process.env.NODE_ENV);
  return passport.authenticate('twitter', {
    successRedirect: "/",
    failureRedirect: "/"
  })(req, res, next);
});

router.get( "/user", function( req, res){
  console.log( "/apo/user :", req.user);
  if( req.user){
    res.send( req.user);
  } else {
    res.send( {success:false, message: "user not authed"});
  }
});

module.exports = router;
