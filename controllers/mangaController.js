const Manga = require("../models/manga");
const async = require("async");

// Display list of all mangas
exports.manga_list = (req, res, next) => {
  Manga.find({}, "title author").populate("author").exec((err, list_manga) => {
    if (err) return next(err);
    res.render("manga_list", { title: "Manga List", manga_list: list_manga });
  });
};


// Display single detail for manga
exports.manga_detail = (req, res, next) => {
  Manga.findById(req.params.id)
    .populate("author")
    .populate("genre")
    .populate("magazine")
    .exec((err, manga_info) => {
      if (err) return next(err);
      res.render("manga_detail", { title: "Manga", manga: manga_info });
    });
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