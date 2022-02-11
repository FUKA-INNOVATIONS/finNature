'use strict';
const profileModel = require('../models/profileModel');
const {validationResult} = require('express-validator');

// Get Profile likes = total amount of post likes of the user
const get_profile_likes = async (req, res) => {

};

// get profiles details by user id
const get_profile_details = async (req, res) => {
  //const userId = req.params.id;
  const userId = 1;
  console.log(userId);
  try {
    //const profileDetails = await profileModel.getProfileDetailsbyUserId(userId);
    // TODO: delete password
    //res.json(profileDetails);
    //res.status(400);

  } catch (e) {
    console.log('Catched Error in get_profile_details controller: ', e.message);
  }
};

// get profile posts by usename
const get_profile_posts = async (req, res) => {
  try {

    const userName = req.params.username;
    console.log('before calling model in profileController');
    const profilePosts = await profileModel.getProfilePosts(userName);
    console.log('after calling model in profileController');
    console.log('profile posts: profileController: ', profilePosts);

    // Check if there is logged in user
    if (req.user) {
      const userId = req.user.id;

      // Check if authenticated user is owner of the posts, returns boolean
      profilePosts.forEach(post => {
        post.isOwner = post.user_id === userId;
      });
    }

    res.json(profilePosts);
  } catch (e) {
    console.log('Error in get_profile_posts catch: ', e.message);
  }
};

module.exports = {
  get_profile_posts,
  get_profile_details,
  get_profile_likes,

};