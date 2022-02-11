'use strict';
const sharp = require('sharp');

const makeThumbnail = async (file, thumbname) => { // file = full path to image (req.file.path), thumbname = filename (req.file.filename)
  return await sharp(file).resize(200, 200).toFile('mediathumbnails/' + thumbname);
};

const resizeImage = async (file, thumbname) => { // file = full path to image (req.file.path), thumbname = filename (req.file.filename)
  return await sharp(file).resize(800, 800).toFile('postmedia_resized/' + thumbname);
};

module.exports = {
  makeThumbnail,
  resizeImage,
};
