const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User')

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(async function(id, done) {
    await  User.findById(id, function(err, user) {
      done(err, user);
    });
});


passport.use('local-signup', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
    },  async (req, email, password, done) => {
        const existUser = await User.findOne({email:email})
        if (!existUser){
            let newUser = new User()
            newUser.email = email
            newUser.password = newUser.encryptPassword(password)
            newUser.save((err, user) => {
                if (err)
                    return done(err, false)
                done(null, user)
            })
        }else{
            return done(null,false)
        }
    }
  ));

passport.use('local-login', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({email: email}, (err, user) => {
        if (err)
            return done(err,false)
        if (!user)
             return done(null, false)
        if (!user.comparePassword(password))
            return done(null, false)
        done( null, user)
    })
}))