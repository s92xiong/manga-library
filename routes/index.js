var express = require('express');
var router = express.Router();

const author_controller = require("../controllers/authorController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/// ------------------------------ MANGA ROUTES ------------------------------ ///

// GET & POST request to create a manga
// router.get("/manga/create", manga_controller.manga_create_get);
// router.post("/manga/create", manga_controller.manga_create_post);

// // GET & POST request to delete a manga
// router.get("/manga/delete", manga_controller.manga_delete_get);
// router.post("/manga/delete", manga_controller.manga_delete_post);

// // GET & POST request to update a manga
// router.get("/manga/update", manga_controller.manga_update_get);
// router.post("/manga/update", manga_controller.manga_update_post);

// // Get request for a single Manga
// router.get("/manga/:id", manga_controller.manga_detail);

// // GET request for Manga List
// router.get("/mangas", manga_controller.manga_list);


/// ------------------------------ AUTHOR ROUTES ------------------------------ ///

// GET & POST request to create an author
router.get("/author/create", author_controller.author_create_get);
router.post("/author/create", author_controller.author_create_post);

// GET & POST request to delete an author
router.get("/author/delete", author_controller.author_delete_get);
router.post("/author/delete", author_controller.author_delete_post);

// GET & POST request to update an author
router.get("/author/update", author_controller.author_update_get);
router.post("/author/update", author_controller.author_update_post);

// Get request for a single author
router.get("/author/:id", author_controller.author_detail);

// GET request for Author's list of manga
router.get("/authors", author_controller.author_list);


/// ------------------------------ GENRE ROUTES ------------------------------ ///

// GET & POST request to create an genre
// router.get("/genre/create", genre_controller.genre_create_get);
// router.post("/genre/create", genre_controller.genre_create_post);

// // GET & POST request to delete an genre
// router.get("/genre/delete", genre_controller.genre_delete_get);
// router.post("/genre/delete", genre_controller.genre_delete_post);

// // GET & POST request to update an genre
// router.get("/genre/update", genre_controller.genre_update_get);
// router.post("/genre/update", genre_controller.genre_update_post);

// // Get request for a single genre
// router.get("/genre/:id", genre_controller.genre_detail);

// // GET request for genre list
// router.get("/genres", genre_controller.genre_list);


/// ------------------------------ MAGAZINE ROUTES ------------------------------ ///

// GET & POST request to create a magazine
// router.get("/magazine/create", magazine_controller.magazine_create_get);
// router.post("/magazine/create", genre_controller.magazine_create_post);

// // GET & POST request to delete a magazine
// router.get("/magazine/delete", magazine_controller.magazine_delete_get);
// router.post("/magazine/delete", genre_controller.magazine_delete_post);

// // GET & POST request to update a magazine
// router.get("/magazine/update", magazine_controller.magazine_update_get);
// router.post("/magazine/update", magazine_controller.magazine_update_post);

// // Get request for a single magazine
// router.get("/magazine/:id", magazine_controller.magazine_detail);

// // GET request for a list of magazines
// router.get("/magazines", magazine_controller.magazine_list);


module.exports = router;