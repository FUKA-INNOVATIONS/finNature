'use strict';
//const url = 'http://localhost:3000';

// Get login form
const loginInForm = document.querySelector('#loginInForm');

// Get register form
const registerForm = document.querySelector('#registerForm');

// Get login error span
const loginError = document.querySelector('#loginError');

// Get registration error span
const registerError = document.querySelector('#registerError');

// Get the modal
const modal = document.getElementById("authModal");

// Get top navigation
const topNavigation = document.querySelector('#navigation-top');

// Get the button that opens the modal
const authBtn = document.getElementById("authentication-btn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
authBtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

// Login user with form data
loginInForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(loginInForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + '/auth/login', fetchOptions);
  const json = await response.json();
  console.log('login response', json);
  if (!json.user) {
    loginError.style.display = "block";
  } else {
    // save token
    sessionStorage.setItem('token', json.token);
    // TODO: Fix nav open button after logging in

    // Close navigation and authentication windows
    modal.style.display = "none";
    topNavigation.style.display = "none";
  }
});

// Register user with form data
// TODO: compare passwords to match
registerForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(registerForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/auth/register', fetchOptions);

  const json = await response.json();

  if (json.errors) {
    registerError.style.display = "block";
  } else {
    console.log('user add response', json);
    // save token
    // TODO: compare passwords to match
    sessionStorage.setItem('token', json.token);

    // Close navigation and authentication windows
    modal.style.display = "none";
    topNavigation.style.display = "none";
  }
});