'use strict';
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// local strategy for username password login
// TODO: set custom username and password field names
passport.use(new Strategy(
    async (username, password, done) => {
      const params = [username];
      try {
        const [user] = await userModel.getUserLogin(params);
        console.log('Local strategy in pass.js', user); // result is binary row
        if (user === undefined) {
          return done(null, false, {message: 'Incorrect credentials.'});
        }
        //if (user.password !== password) {
        // password = entered password AND user.password = hashed pass from database
        if (!await bcrypt.compare(password, user.password)) {
          return done(null, false, {message: 'Incorrect credentials.'});
        }
        // Delete password
        delete user.password; // Delete user password from the result
        // {...user} => create new object and include/spread user/binary raw
        return done(null, {...user}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
      } catch (err) {
        return done(err);
      }
    }));


// JWTStrategy = jwt =  passport.authenticate('jwt', {se....  in app.js
passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'KADJeeKadalasj8eALADJeSFVNr74FNf8fFSSssE', // Same token as in authController.js
    },
    async (jwtPayload, done) => {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      try {
        const user = await userModel.getUser(jwtPayload.id);
        console.log('JWTStrategy try block before returning done');
        return done(null, user);
        console.log('JWTStrategy try block after returning done');
      } catch (err) {
        return done(err);
      }
    },
));

module.exports = passport;