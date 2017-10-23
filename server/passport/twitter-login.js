const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('mongoose').model('User');
    // config = require('../config');

module.exports = function() {
  const callback_url = "http://localhost:3000/callback";

  passport.serializeUser(function(user, done) {
    return done(null, user.id);
  });

  passport.deserializeUser(function(userId, done) {
    User.findById(userId, function(err, user) {
      return done(err, user);
    })
  });

  passport.use(new TwitterStrategy({
    consumerKey: process.env.CONSUMER_KEY, // config.twitter.consumerKey,
    consumerSecret: process.env.CONSUMER_SECRET, // config.twitter.consumerSecret,
    callbackURL: callback_url // config.twitter.callbackURL
  }, function(accessToken, refreshToken, profile, done) {
    var searchQuery = {
      twitterId: profile.id
    };
    var update = {
      twitterId: profile.id,
      name: profile.displayName
    };
    var updateOptions = {
      upsert: true
    };
    User.findOneAndUpdate(searchQuery, update, updateOptions, function(err, user) {
        return done(err, user);
    });
  }));
};
