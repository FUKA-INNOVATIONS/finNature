const passport = require('../utils/pass');
const express = require('express');
const router = express.Router();
const rootController = require('../controllers/rootController');

router.route('/popular-posts').
    get(rootController.get_popular_posts);

router.route('/latest-posts').
    get(rootController.get_latest_posts);

module.exports = router;