'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

// Get post by id
const getPostById = async (postId) => {
  /*
  * NOT SOLUTION
  * SELECT fn_post.*, fn_comment.id AS comment_id, fn_comment.user_id AS comment_user_id, fn_comment.post_id AS comment_post_id,
  * fn_comment.content AS comment_content, fn_comment.comment_creation AS comment_creation, COUNT(fn_comment.id) AS comments_count
  * FROM fn_post LEFT JOIN fn_comment ON (fn_comment.id = fn_post.id) WHERE fn_post.id = ?
  * */

  // SELECT fn_post.*, COUNT(fn_like.id) AS likes FROM fn_post LEFT JOIN fn_like ON (fn_like.post_id = fn_post.id) GROUP BY fn_post.id

  try {
    const [post] = await promisePool.query('SELECT fn_post.* , fn_user.user_name FROM fn_post, fn_user WHERE fn_post.id = ? AND fn_post.user_id = fn_user.id', [postId]);
    //console.log('getPostById in postModel ', post);
    //postDetails = {...post, ...}
    return post;
  } catch (e) {
    console.log('Error in getPostById catch postModel: ', e.message);
  }

};

// Get post likes by post id
const getPostLikes = async (postId) => {

  try {
    const [postLikes] = await promisePool.query('SELECT * FROM fn_like WHERE post_id = ?', [postId]);
    return postLikes;
  } catch (e) {
    console.log('Error in getPostLikes catch postModel: ', e.message);
  }

};


// Get post comments by post id
const getPostComments = async (postId) => {

  try {
    const [postComments] = await promisePool.query('SELECT fn_comment.*, fn_user.user_name FROM fn_comment, fn_user WHERE post_id = ? AND fn_user.id = fn_comment.user_id', [postId]);
    return postComments;
  } catch (e) {
    console.log('Error in getPostComments catch postModel: ', e.message);
  }

};


// Create new post
const insertPost = async (post) => {

  try {
    const [row] = await promisePool.execute(
        'INSERT INTO fn_post (user_id, media_url, media_type, description, media_location, media_creation) VALUES (?, ?, ?, ?, ?, ?)',
        [post.user_id, post.media_url, post.media_type, post.createPostDescription, post.createPostLocation, post.createPostDate]
    );
    return row.insertId;
  } catch (e) {
    console.log('Error in insertPost catch: ', e.message);
  }

};

const getUserPosts = async (userId) => {

  try {
    const [userPosts] = await promisePool.query('SELECT * FROM fn_post WHERE user_id = ?', [userId]);
    console.log('posts in model: ', userPosts);
    return userPosts;
  } catch (e) {
    console.log('Error in getUserPosts catch: ', e.message);
  }

};

const getPopularPosts = async () => {

  // TODO: order by likes ASC

  try {
    const [userPosts] = await promisePool.query('SELECT fn_post.*, COUNT(fn_like.id) AS likes FROM fn_post LEFT JOIN fn_like ON (fn_like.post_id = fn_post.id) GROUP BY fn_post.id ORDER BY likes DESC LIMIT 8');
    return userPosts;
  } catch (e) {
    console.log('Error in getPopularPosts Model', e.message)
  }

}

const getLatestPosts = async () => {

  // TODO: order by likes ASC

  try {
    const [latestPosts] = await promisePool.query('SELECT fn_post.*, COUNT(fn_like.id) AS likes FROM fn_post LEFT JOIN fn_like ON (fn_like.post_id = fn_post.id) GROUP BY fn_post.id ORDER BY fn_post.post_creation DESC LIMIT 8');
    return latestPosts;
  } catch (e) {
    console.log('Error in getPopularPosts Model', e.message)
  }

}

module.exports = {
  insertPost,
  getUserPosts,
  getPopularPosts,
  getLatestPosts,
  getPostById,
  getPostComments,
  getPostLikes,
}