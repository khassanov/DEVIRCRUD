var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require ('../models/User');
router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy({usernameField: 'email'},
    function(email, password, done){

        User.findOne({email: email}).exec(function(err, user){


            if (err){
                return done(err);
            }

            if (!user){

                return done(null, false);
            }

            user.comparePassword(password, function(err, isMatch){
                if (err){
                    return done(err);
                }
                if (isMatch){
                    return done(null, user);
                }

                return done(null, false);
            });
        });
    }
));

passport.serializeUser(function(user, done){
    done(null, user._id);
});

passport.deserializeUser(function(id, done){
    console.log('Right now');
    User.findById(id, function(err, user){
        done(err, user);
    });
});
module.exports = router;
