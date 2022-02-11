'use strict';

const express = require('express');
const app = express();
const port = 3000;

// Require/include routes
const adminRoute = require('./routes/adminRoute'); // Only admin users are allowed
const authRoute = require('./routes/authRoute');
const profileRoute = require('./routes/profileRoute');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const rootRoute = require('./routes/rootRoute');

// Public static folders
app.use(express.static('public'));  // Front end / UI files
app.use(express.static('uploads')); // All uploaded files
app.use(express.static('postmedia')); // Post Media file's folder (original size)
app.use('/mediathumbnails', express.static('mediathumbnails')); // Post media thumbnails (200*200px)
app.use('/postmedia_resized', express.static('postmedia-resized')); // Resized post media (800*800px)

app.use(express.json());  // For parsing application/json
app.use(express.urlencoded({extended: true}));  // For parsing application/x-www-form-urlencoded

// Routes
app.use('/', rootRoute  );  // Root route
app.use('/auth', authRoute);  // Authentication and registration route
app.use('/post', postRoute); // Route for handling posts
app.use('/user', userRoute);
app.use('/profile', profileRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
