const Manga = require("../models/manga");


// Display list of all mangas
exports.manga_list = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Manga List");
};


// Display single detail for manga
exports.manga_detail = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Manga Detail: " + req.params.id);
};


// Display the form to create a manga
exports.manga_create_get = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Manga Create GET");
};


// Handle creating a manga
exports.manga_create_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Manga Create POST");
};


// Show form to delete a manga
exports.manga_delete_get = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Manga Delete GET");
};


// Handle deleting a manga
exports.manga_delete_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Manga Delete POST");
};


// Show form to update a manga
exports.manga_update_get = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Manga Update GET");
};


// Handle updating a manga 
exports.manga_update_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Manga Update POST");
};