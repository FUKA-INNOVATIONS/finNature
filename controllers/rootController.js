'use strict';
const postModel = require('../models/postModel');

// Get popular posts, limit 8, ASC by likes amount
const get_popular_posts = async (req, res) => {
  //console.log('get_popular_posts controller called');
  try {
    const popularPosts = await postModel.getPopularPosts()
    res.json(popularPosts);
  } catch (e) {
    console.log('Error in get_popular_posts catch: ', e.message);
  }
}

// Get latest posts, limit 8, ASC by post creation date
const get_latest_posts = async (req, res) => {
  //console.log('get_latest_posts controller called');
  try {
    const latestPosts = await postModel.getLatestPosts()
    res.json(latestPosts);
  } catch (e) {
    console.log('Error in get_latest_posts catch: ', e.message);
  }
}

module.exports = {
  get_popular_posts,
  get_latest_posts,
}