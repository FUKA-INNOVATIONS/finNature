'use strict';

// Get create post form
const createPostForm = document.querySelector('#createPostForm');

// Get create post error span
const createPostError = document.querySelector('#createPostError');

// Get the modal
const createPostmodal = document.getElementById('createPostModal');

// Get top navigation
//const topNavigation = document.querySelector('#navigation-top');

// Get the button that opens the modal
//const btn = document.getElementById('createPostBtn');

// Get the <span> element that closes the modal
//const span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  createPostmodal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  createPostmodal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === createPostmodal) {
    createPostmodal.style.display = 'none';
  }
};

console.log('createPost.js called');

// Submit crate new post form
createPostForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  console.log('createPostForm eventlistner called');

  // TODO: redirect to post detail page after post creation

  // Get form data
  const formData = new FormData(createPostForm);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: formData,
  };
  console.log(fetchOptions);
  const response = await fetch(url + '/post/create', fetchOptions);
  const json = await response.json();
  console.log('create post response', json);

});