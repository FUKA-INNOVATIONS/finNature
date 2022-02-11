'use strict';

const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const {validationResult} = require('express-validator');

const user_create = async (req, res, next) => {

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  // Create new object and assign req.body data to it
  const user = {};
  user.name = req.body.nickname;
  user.username = req.body.username;

  // Create user with data from req.body
  const salt = bcrypt.genSaltSync(12); // 12 rounds
  //const hash = bcrypt.hashSync(req.body.password, salt); // Hash the password
  //req.body.password = hash; // replace entered string pass with hashed pass
  user.password = bcrypt.hashSync(req.body.password, salt); // Hash and and override (req.body.password)

  console.log(user);
  const userId = await userModel.addUser(user);
  if (userId > 0) {
    // TODO: upload profile imge here or after registration on profile page
    next();
  } else {
    res.status(400).json({error: 'login responseing up failure'}).end();
  }
};

/* Get user details by email
const get_user_login = async (req, res) => {
  const userEmail = req.user.email;
  console.log('req.user.email: ', userEmail);
  const response = await userModel.getUserLogin(userEmail);
  //const userDetail = await response.json();
  // TODO: Delete password
  res.json(response);
} */


module.exports = {
  user_create,
}