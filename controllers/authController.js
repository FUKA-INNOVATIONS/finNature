'use strict';
const jwt = require('jsonwebtoken');
const passport = require('../utils/pass');

const login = (req, res) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user,
      });
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed json web token with the contents of user object and return it in the response
      const token = jwt.sign(user, 'KADJeeKadalasj8eALADJeSFVNr74FNf8fFSSssE');
      return res.json({user, token});
    });
  })(req, res);
};

const logout = (req, res) => {
  req.logout();
  res.json({message: 'logout success'});
}

module.exports = {
  login,
  logout,
};