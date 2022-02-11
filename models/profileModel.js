'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getProfileDetailsbyUserId = async (userId) => {
  try {
    //const [profileDetails] = await promisePool.query('SELECT * from fn_user WHERE id = ? ', [userId]);
    //return profileDetails;
    return true;
  } catch (e) {
    console.log('Catched Error in getProfileDetails model: ', e.message)
  }
}

const getProfilePosts = async (userName) => {

  try {
    const [userId] = await promisePool.query('SELECT id FROM fn_user WHERE user_name = ?', [userName]);
    //console.log('UID', {...userId});
    const id = Object.assign({}, userId[0]);
    //console.log('IDDIDIIDI:::', normalObj.id);
    const [profilePosts] = await promisePool.query('SELECT * FROM fn_post WHERE user_id = ?', [id.id]);
    console.log('profilePosts in model: ', profilePosts);
    return profilePosts;
  } catch (e) {
    console.log('Error in profilePosts catch: ', e.message);
  }

};

module.exports = {
  getProfilePosts,
  getProfileDetailsbyUserId,
}