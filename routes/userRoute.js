const passport = require('../utils/pass');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {body, validationResult} = require('express-validator');
const userModel = require('../models/userModel');
const userController = require('../controllers/userController');

// Get logged in user's details
router.route('/get_logged_user').
    get(
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            res.json(req.user);
        }
    );

module.exports = router;