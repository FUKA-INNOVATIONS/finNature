'use strict';
const postModel = require('../models/postModel');
const {validationResult} = require('express-validator');
const { makeThumbnail, resizeImage } = require('../utils/resizeMedia');
const { getCoordinates } = require('../utils/imageMeta');


//TODO: return status codes
// Get Single post details
const get_post_by_id = async (req, res) => {
  const postId = req.params.post_id;
  console.log('req.params.post_id: ', postId);

  try {
    const post = await postModel.getPostById(postId);

    // TODO: Check if authenticated user is owner of the post

    // Check if post exists
    if (post.length > 0) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not availabe'});
    }

  } catch (e) {
    console.log('Error in get_post_by_id catch: ', e.message);
  }
}

// Get post likes by id
const get_likes_by_postid  = async (req, res) => {
  const postId = req.params.post_id;

  try {
    const likes = await postModel.getPostLikes(postId);

    // Check if post exists
    if (likes.length > 0) {
      res.status(200).json(likes);
    } else {
      res.status(404).json({likes: '0'});
    }

  } catch (e) {
    console.log('Error get_likes_by_postid catch: ', e.message);
  }
}

// Get commets for a single post
const get_comments_by_postid = async (req, res) => {
  const postId = req.params.post_id;
  console.log('req.params.post_id: ', postId);

  try {
    const comments = await postModel.getPostComments(postId);

    // TODO: Check if authenticated user is owner of the post

    // Check if post exists
    if (comments.length > 0) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({message: 'No comments availabe'});
    }

  } catch (e) {
    console.log('Error get_comments_by_postid catch: ', e.message);
  }
}



// Create new post, restricted for authenticated users
const create_post = async (req, res) => {
  console.log('create_post in controller called');

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // CHeck media file size, max 2MB
  const mediaSize = req.file.size;

  try {
    console.log(req.body);
    console.log('create_post controller called');

    // TODO: exif data -> date
    // TODO: Get image date from exif data

    const post = {...req.body};
    //console.log('post dsc: ', post.create-post-description);
    post.user_id = req.user.id;
    post.media_url = req.file.filename; // replace with file.path and prefix orifinal name with either user_id or username
    post.media_type = req.file.mimetype;
    // TODO: Dont upload if file size exceeds 2 MB
    console.log('post controller line 32', post);
    // We cant always trust device location so we dont include coords, instead user difines location
    const postId = await postModel.insertPost(post);
    res.json({message: 'Post created succesfully'});
  } catch (e) {
    console.log('Error in create_post catch: ', e.message);
  }
};

const get_user_posts = async (req, res) => {
  try {
    console.log('req.user in get_user_posts try block: ', req.user);

    if (req.user) {
      console.log('user : in controller: ', req.user);
    } else {
      console.log('no user : controller');
    }

    const userId = req.user.id;
    //const userId = 1; // fake user id

    console.log('before calling model in postController');
    const userPosts = await postModel.getUserPosts(userId);
    console.log('after calling model in postController');
    console.log('user posts: postController: ', userPosts);

    // Check if authenticated user is owner of the posts, returns boolean
    userPosts.forEach( post => {
      post.isOwner = post.user_id === userId;
    });

    res.json(userPosts);
  } catch (e) {
    console.log('Error in get_user_posts catch: ', e.message);
  }
};

// TODO: dont resize incase file is AVI
// Middleware to make thumbnail
const make_thumbnail = async (req, res, next) => {
  console.log('make thumbanail called');

  if (req.file.mimetype !== 'video/x-msvideo') {
    try {
      const thumbnail = await makeThumbnail(req.file.path, req.file.filename);
      // if thumbnail creation succeedes
      if (thumbnail) {
        console.log('next called in make thumbanail');
        next();
        //console.log('next in make_thumbnail called');
      }
    } catch (e) {
      console.log('catch in make_thumbnail called');
      // Thumbnail creation failure
      res.status(400).json({error: e.message});
    }
  }

}

// TODO: dont resize incase file is AVI
// Middleware to resize image
const resize_image = async (req, res, next) => {
  console.log('rezie image called');

  if (req.file.mimetype !== 'video/x-msvideo') {
    try {
      const resizedImage = await resizeImage(req.file.path, req.file.filename);
      // if thumbnail creation succeedes
      if (resizedImage) {
        console.log('next called in resize_image');
        next();
        console.log('after calling next in resize_image');
      }
    } catch (e) {
      console.log('catch in resize_image called');
      // Image resize failure
      res.status(400).json({error: e.message});
    }
  }

}


module.exports = {
  create_post,
  get_user_posts,
  make_thumbnail,
  resize_image,
  get_post_by_id,
  get_comments_by_postid,
  get_likes_by_postid,
}