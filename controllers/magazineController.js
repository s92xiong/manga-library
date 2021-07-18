const Magazine = require("../models/magazine");

// Render a list of magazines
exports.magazine_list = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Magazine list');
};


// Render a magazine item
exports.magazine_detail = (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Magazine detail: ${req.params.id}`);
};


// Render magazine create form
exports.magazine_create_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Magazine Create Get');
};


// Handle magazine create form
exports.magazine_create_post = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Magazine Create Post');
};


// Render magazine delete form
exports.magazine_delete_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Magazine Delete Get');
};


// Handle magazine delete form
exports.magazine_delete_post = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Magazine Delete Post');
};


// Render magazine update form
exports.magazine_update_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Magazine Update Get');
};


// Handle magazine update form
exports.magazine_update_post = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Magazine Update Post');
};