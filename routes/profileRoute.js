const passport = require('../utils/pass');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {body, validationResult} = require('express-validator');
const profileModel = require('../models/profileModel');
const profileController = require('../controllers/profileController');

// Get posts byt id
/*router.route('/:id').
    get(
        //passport.authenticate('jwt', {session: false}),
        (req, res) => {
          //res.json(req.user);
        },
    ); */


// Get user details od the profile owner
router.route('/user/:id').
    get(profileModel.getProfileDetailsbyUserId);

// Get posts by username: finnature.fi/profile?username=fuka
// get user id and redirect to /:id
router.route('/posts/:username').
    get(
        //passport.authenticate('jwt', {session: false}),
        profileController.get_profile_posts,
    );

module.exports = router;