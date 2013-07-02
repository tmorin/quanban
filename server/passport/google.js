var U = require('underscore'),
    GoogleStrategy = require('passport-google').Strategy,
    conf = require('../conf'),
    usersRepo = require('../model/usersRepo');

function googleCallback(identifier, profile, done) {
    console.log('GoogleStrategy', 'identifier', identifier);
    console.log('GoogleStrategy', 'profile', profile);
    var email = U.first(profile.emails) || {};
    usersRepo.findOrCreate({
        provider: 'google',
        identifier: identifier,
        meta: profile
    }, {
        email: email.value,
        username: profile.displayName
    }).then(function (user) {
        done(null, user);
    }).fail(done);
}

exports.strategy = new GoogleStrategy(conf.passport.google, googleCallback);
