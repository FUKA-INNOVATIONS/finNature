const passport = require('../utils/pass');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {check, validationResult} = require('express-validator');
//const postModel = require('../models/postModel');
const postController = require('../controllers/postController');

// Define accepted file type that user is allowed to upload during port creation
const fileFilter = (req, file, cb) => {
  console.log('file filter called');
  if (file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/gif' ||
      file.mimetype === 'video/mp4' ||
      file.mimetype === 'video/x-msvideo') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Test file filter MW
const testFile = (req, res, next) => {
  // if fileFilter is true
  console.log('test file called');
  if (req.file) {
    next();
  } else {
    res.status(400).json({erros: 'file is not image or video'});
  }
};

// Folder where post media files are uploaded
const upload = multer({dest: 'postmedia/', fileFilter});

// Get post by post id
router.route('/:post_id').
    get(postController.get_post_by_id);

// Gey likes by id

router.route('/likes/:post_id').
    get(postController.get_likes_by_postid);

// Get post comments by post id
router.route('/comments/:post_id').
    get(postController.get_comments_by_postid);

router.route('/get_user_posts').
    get(
        passport.authenticate('jwt', {session: false}),
        postController.get_user_posts,
    );

// TODO: MAX file size
// TODO: dont resize incase file is AVI
// Create new post, restricted for authenticated users
router.route('/create').
    post(
        passport.authenticate('jwt', {session: false}),
        upload.single('create-post-file'),
        testFile, // TODO: shouldnt this be called before uploading?
        postController.resize_image,
        postController.make_thumbnail,
        // TODO: fix Validate fileds bug, tested with body and check but program stops there when calidation, ile knows, possibly express-validator bug?
        //check('createPostDescription').isLength({min: 15, max: 255}).isAlphanumeric,
        //check('createPostLocation').isLength({min: 5, max: 30}).isAlphanumeric,
        //check('createPostDate').isLength({min: 10, max: 10}).isDate(),
        postController.create_post,
    );

module.exports = router;