'use strict';

// Get popular posts div in homepage
const popularPostsSectionHome = document.querySelector('#popularPostsItemHome');

// Get latest posts  div in homepage
const latestPostsSectionHome = document.querySelector('#latestPostsItemHome');

// Function for creating post items
const createPostItemCards = (posts, div) => {

  // finnature.fi/post_detail.html?post_id=${post.id}

  posts.forEach(post => {
    console.log('post :', post);

    const postTitle = post.media_location;
    //const postDescription = post.media_description;
    const postLikes = post.likes;

    const article = document.createElement('article');
    article.classList.add('post-item');
    // TODO: Create video tag incase media is video
    // TODO: Add file extention to image.src
    // TODO: Add img alt
    const image = document.createElement('img');
    image.classList.add('post-image');
    image.src = `${url}/mediathumbnails/${post.media_url}`;
    image.setAttribute('alt', `image-${post.media_location}`);
    const title = document.createElement('h3');
    title.append(postTitle);
    title.classList.add('post-location');
    //const description = document.createElement('p');
    //description.classList.add('post-description');
    //description.appendChild(postDescription);
    const iconsDiv = document.createElement('div');
    iconsDiv.classList.add('post-icons-home');
    const likeIcon = document.createElement('i');
    likeIcon.classList.add('like-home');
    likeIcon.classList.add('fa');
    likeIcon.classList.add('fa-heart');
    const likesSpan = document.createElement('span');
    likesSpan.classList.add('like-counter-home');
    likesSpan.append(postLikes);

    iconsDiv.append(likeIcon);
    iconsDiv.append(likesSpan);

    article.append(image);
    article.append(title);
    article.append(iconsDiv);

    div.append(article);

    // ClickListers for post items that moves user to Single post item detail page
    image.addEventListener('click', () => {
      //console.log('POST ID: ', post.id)
      window.location.href = `${url}/post_detail.html?id=${post.id}`;
    });

    title.addEventListener('click', () => {
      //console.log('POST ID: ', post.id)
      window.location.href = `${url}/post_detail.html?id=${post.id}`;
    });

  });
};

// Get popular posts, order by likes, limit 8 => Inject into homepage popular posts section
const getPopularPosts = async () => {
  try {
    const response = await fetch(url + '/popular-posts');
    const popularPosts = await response.json();
    //console.log('popular posts returned by ajax call: ', popularPosts);

    // Create HTML elements for post item (article)
    createPostItemCards(popularPosts, popularPostsSectionHome);

  } catch (e) {
    console.log(e.message);
  }
};
getPopularPosts();

// Get latest posts, order by date/newest, limit 8 => Inject into homepage latest posts section
const getLatestPosts = async () => {
  try {
    const response = await fetch(url + '/latest-posts');
    const latestPosts = await response.json();
    //console.log('latest posts returned by ajax call: ', latestPosts);

    // Create HTML elements for post item (article)
    createPostItemCards(latestPosts, latestPostsSectionHome);

  } catch (e) {
    console.log(e.message);
  }
};
getLatestPosts();
