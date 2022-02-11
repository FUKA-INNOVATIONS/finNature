'use strict';
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const {body, validationResult} = require('express-validator');

router.post('/login', authController.login);

// TODO: sanitize
router.post('/register',
    body('nickname').
        isAlpha().
        isLength({min: 3, max: 10}).
        escape().
        blacklist(';'),
    body('username').isEmail(),
    // isStrongPassword('{ minLength: 8, minLowercase: 1}') plus other attributes, check docs
    // Remember to hash password
    body('password').matches('(?=.*[A-Z]).{8,}'),
    userController.user_create,
    authController.login
);

router.get('/logout', authController.logout);

module.exports = router;