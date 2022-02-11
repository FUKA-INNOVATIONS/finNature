'use strict';
//const url = 'http://localhost:3000';   // defined in authentication.js and included in html, change lit later

const headerUsername = document.querySelector('#header-username');
const userBanner = document.querySelector('#user-banner');
const jsjs = '<link rel="stylesheet" href="css/authenticatsdsdion.css">';

// get logout button/link
const logoutBtn = document.querySelector('#logoutBtn');
//console.log(logoutBtn)

if (sessionStorage.getItem('token')) {
  // Get logged in user's details and retund json object
  const getLoggedUser = async () => {
    try {
      const options = {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      const response = await fetch(url + '/user/get_logged_user',
          options);
      const userDetails = await response.json();

      if (userDetails) {
        userBanner.style.display = 'flex';
        headerUsername.innerHTML = userDetails.user_name;
      } else {
        userBanner.style.display = 'none';
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  getLoggedUser();
}


// logout
logoutBtn.addEventListener('click', async (evt) => {
  console.log('logout eventListener called');
  evt.preventDefault();
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/auth/logout', options);
    const json = await response.json();
    console.log(json);
    sessionStorage.removeItem('token'); // remove token
    alert('You have logged out');
    // Hide user section in banner
    userBanner.style.display = 'none';
  }
  catch (e) {
    console.log(e.message);
  }
});
