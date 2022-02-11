'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

// User registration
const addUser = async (user) => {
  try {
    const [row] = await promisePool.execute(
        'INSERT INTO fn_user (user_name, email, password, type, status) VALUES (?, ?, ?, ?, ?)',
        [user.name, user.username, user.password, 1, 1]);
    console.log('Created user', row);
    return row.insertId;
  } catch (e) {
    console.log('UserModel -> addUSer: ', e);
  }
};

// Get user details by id
const getUser = async (id) => {
  try {
    console.log('userModel getUser', id);
    const [rows] = await promisePool.execute(
        'SELECT * FROM fn_user WHERE id = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error('userModel:', e.message);
  }
};


const getUserLogin = async (params) => {
  try {
    console.log(params);
    console.log('params in userModel -> getUserLogin: ', params);
    const [row] = await promisePool.execute(
        'SELECT * FROM fn_user WHERE email = ?;', params);
    return row;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  addUser,
  getUser,
  getUserLogin,
}