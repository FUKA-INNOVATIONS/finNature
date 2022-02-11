'use strict';

// Get singlePostContentDiv
const singlePostContentDiv = document.querySelector('#singlePostContentDiv');

// Parse value from URI
const getParameterByName = (name, url = window.location.href) => {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

// Get single post details and show it on post_detail.html?id=4        pet.id   link href="${url}/petdeatil.html?${petid}"
const postId = getParameterByName('id');

// Get post comments for Single post by post id
// Get all post added by authenticated user
const getPostComments = async (postId) => {
  //console.log(' getPostComments called in post-detail.js');

  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };

    //console.log('Before Ajax call in  getPostComments');
    const response = await fetch(`${url}/post/comments/${postId}`, options);
    //console.log('After Ajax call in  getPostComments, url = ', url);
    const comments = await response.json();
    console.log('Single post comments returned by ajax call: ', comments);
    return comments;

  } catch (e) {
    console.log('Catch in ajax call: post-detail.js getPostComments: ',
        e.message);
  }
};
const comments = getPostComments(postId);
//console.log(getPostComments(postId))

const getPostLikes = async (postId) => {

  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(`${url}/post/likes/${postId}`, options);
    const likes = await response.json();
    console.log('Post likes: ', likes.length);

    return likes.length;

  } catch (e) {
    console.log('Catch in ajax call: post-detail.js getPostLikes: ',
        e.message);
  }
};

// Post likes counter
const postLikes = getPostLikes(postId);

// For creation and injection of post detail page content
const createPostDetailContent = (div, post, likes) => {

  div.innerHTML = `
  <article class="profile-picture" id="postDetailArticle">
      <img id="postDetailImage" src="${url}/mediathumbnails/${post[0].media_url}" class="post-image" alt="image-${post[0].media_location}" width="300px">
      <h1 class="profile-picture-title" id="postDetailTitle">${post[0].media_location}</h1>
      <div class="post-icons-home"><i class="like-home fa fa-heart"></i><span class="like-counter-home">444</span></div>
      <p class="photo-like" id="postDetailUserLink">${post[0].media_creation.slice(0, 10)} By <a href="${url}/profile.html?id=${post[0].user_name}">${post[0].user_name}</a></p>
  </article>
  <article class="profile-about" id="postDescriptionArticle">
      <h1 class="about-title">
          Description
      </h1>
      <p class="about-text">${post[0].description}
      </p>
  </article>`;

  /*
  const postDetailImageArticle = document.createElement('article');
  postDetailImageArticle.classList.add('profile-picture');
  postDetailImageArticle.setAttribute('id', 'postDetailArticle');

  const postImage = document.createElement('img');
  postImage.classList.add('post-image');
  postImage.setAttribute('id', 'postDetailImage');
  postImage.setAttribute('alt', `image-${post[0].media_location}`);
  postImage.src = `${url}/mediathumbnails/${post[0].media_url}`;

  const postTitle = document.createElement('h1');
  postTitle.classList.add('profile-picture-title');
  postTitle.setAttribute('id', 'postDetailTitle')

  const postUserLink = document.createElement('p');
  postUserLink.classList.add('photo-like');
  postUserLink.setAttribute('id', 'postDetailUserLink');

  // Description article
  const postDescriptionArticle = document.createElement('article');
  postDescriptionArticle.classList.add('profile-about');
  postDescriptionArticle.setAttribute('id', 'postDescriptionArticle');
  // Description header h1
  const postDescriptionTitle = document.createElement('h1');
  postDescriptionTitle.classList.add('about-title');
  postDescriptionTitle.innerText = 'Descritpion';
  // Description content p
  const postDesctiption = document.createElement('p');
  postDesctiption.classList.add('about-text');
  postDesctiption.innerText = `${post[0].description}}`;

  // TODO: make user name a clickable link => user profile page
  // TODO: checnge post SQL , add username

  const postTitleText = `${post[0].media_location}`;
  const postUserLinkText = `${post[0].media_creation}`;
  //const postDescriptionTitleText = `Description`;
  const postDescriptionText = `${post[0].description}`;

  postTitle.append(postTitleText);
  postUserLink.append(postUserLinkText);
  //postDescriptionArticle.append(postDescriptionTitleText);
  postDescriptionArticle.append(postDescriptionText);

  postDetailImageArticle.append(postImage);
  postDetailImageArticle.append(postTitle);
  postDetailImageArticle.append(postUserLink);
  postDetailImageArticle.append(postDescriptionArticle);
  postDescriptionArticle.append(postDescriptionTitle);

  div.append(postDetailImageArticle);
  div.append(postDescriptionArticle);
  */

};

const reverseDate = (dateString) => {
  return s.split("").reverse().join("");
}

const createComments = (div, comments) => {

  div.innerHTML += `<h1 class="about-title">
                    Comments
                </h1>`;

  if (comments.length > 0) {
    comments.forEach(comment => {
      div.innerHTML += `<article class="profile-about">
                <p class="about-text">${comment.content}</p>
                <p class="about-text">${comment.comment_creation.slice(0,10)} By <a href="${url}/profile.html?id=${comment.user_name}">${comment.user_name}</a></p>
            </article>`;
    });
  } else {
    div.innerHTML += `
    <p>No comments</p>`;
  }

};

//alert(postId);
// TODO: redirect to home page incase postID is not defined in url
//TODO: ParseInt id, and dont make call to db if not int

// Get single post details for displaying on post_detail.html
const getPostDetails = async (postId) => {
  //console.log(' getPostById called in post-detail.js');

  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };

    //console.log('Before Ajax call in  getPostById');
    const responsePost = await fetch(`${url}/post/${postId}`, options);
    //console.log('After Ajax call in  getPostById, url = ', url);

    // Redirect user to home page if post doesn't exist
    if (responsePost.status === 404) document.location.href = url;

    const post = await responsePost.json();
    console.log('Single post details returned by ajax call: ', post);

    // Get post details including post comments
    //console.log('Before Ajax call in  getPostComments');
    const responseComments = await fetch(`${url}/post/comments/${postId}`,
        options);
    //console.log('After Ajax call in  getPostComments, url = ', url);
    const comments = await responseComments.json();
    //console.log('Single post comments returned by ajax call: ', comments);

    createPostDetailContent(singlePostContentDiv, post, postLikes);
    createComments(singlePostContentDiv, comments);

  } catch (e) {
    console.log('Catch in ajax call: post-detail.js: getPostDetails: ',
        e.message);
  }
};
getPostDetails(postId);
