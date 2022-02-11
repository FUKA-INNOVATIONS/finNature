'use strict';

// Get prost list section
const postsDiv = document.querySelector('#profilePostsSection');

// Parse value from URI
const getParameterByName = (name, url = window.location.href) => {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

// Get username fromthe URI
const username = getParameterByName('username');

// Get all post added by authenticated user
const getUserPosts = async () => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/post/get_user_posts', options);
    const posts = await response.json();
    console.log('posts returned by ajax call: ', posts);
  } catch (e) {
    console.log(e.message);
  }
};
//getUserPosts();

// Get posts of the profile by username parsed from the URL
const getProfilePosts = async () => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + `/profile/posts/${username}`, options);
    const posts = await response.json();
    console.log('Profile posts returned by ajax call : getProfilePosts : ',
        posts);

    posts.forEach(post => {
      postsDiv.innerHTML += `
      <article class="post-item">
          <!-- <img class="post-image" src="test-images/tampere.png"> -->
          <img src="${url}/mediathumbnails/${post.media_url}" class="post-image" alt="image-${post.media_location}">
          <h3 class="post-location">${post.media_location}</h3>
          <div class="post-icons-home">
              <i class="like-home fa fa-heart"></i>
              <span class="like-counter-home">33</span>
          </div>
      </article>`;
    });
  } catch (e) {
    console.log(e.message);
  }
};
getProfilePosts();