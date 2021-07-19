var express = require('express');
var router = express.Router();

const author_controller = require("../controllers/authorController");
const genre_controller = require("../controllers/genreController");
const magazine_controller = require("../controllers/magazineController");
const manga_controller = require("../controllers/mangaController");

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: "Manga Library" });
});

/// ------------------------------ MANGA ROUTES ------------------------------ ///

// GET & POST request to create a manga
router.get("/manga/create", manga_controller.manga_create_get);
router.post("/manga/create", manga_controller.manga_create_post);

// GET & POST request to delete a manga
router.get("/manga/:id/delete", manga_controller.manga_delete_get);
router.post("/manga/:id/delete", manga_controller.manga_delete_post);

// GET & POST request to update a manga
router.get("/manga/:id/update", manga_controller.manga_update_get);
router.post("/manga/:id/update", manga_controller.manga_update_post);

// Get request for a single Manga
router.get("/manga/:id", manga_controller.manga_detail);

// GET request for Manga List
router.get("/mangas", manga_controller.manga_list);


/// ------------------------------ AUTHOR ROUTES ------------------------------ ///

// GET & POST request to create an author
router.get("/author/create", author_controller.author_create_get);
router.post("/author/create", author_controller.author_create_post);

// GET & POST request to delete an author
router.get("/author/:id/delete", author_controller.author_delete_get);
router.post("/author/:id/delete", author_controller.author_delete_post);

// GET & POST request to update an author
router.get("/author/:id/update", author_controller.author_update_get);
router.post("/author/:id/update", author_controller.author_update_post);

// Get request for a single author
router.get("/author/:id", author_controller.author_detail);

// GET request for Author's list of manga
router.get("/authors", author_controller.author_list);


/// ------------------------------ GENRE ROUTES ------------------------------ ///

// GET & POST request to create an genre
router.get("/genre/create", genre_controller.genre_create_get);
router.post("/genre/create", genre_controller.genre_create_post);

// GET & POST request to delete an genre
router.get("/genre/:id/delete", genre_controller.genre_delete_get);
router.post("/genre/:id/delete", genre_controller.genre_delete_post);

// GET & POST request to update an genre
router.get("/genre/:id/update", genre_controller.genre_update_get);
router.post("/genre/:id/update", genre_controller.genre_update_post);

// GET request for a single genre
router.get("/genre/:id", genre_controller.genre_detail);

// GET request for genre list
router.get("/genres", genre_controller.genre_list);


/// ------------------------------ MAGAZINE ROUTES ------------------------------ ///

// GET & POST request to create a magazine
router.get("/magazine/create", magazine_controller.magazine_create_get);
router.post("/magazine/create", magazine_controller.magazine_create_post);

// GET & POST request to delete a magazine
router.get("/magazine/:id/delete", magazine_controller.magazine_delete_get);
router.post("/magazine/:id/delete", magazine_controller.magazine_delete_post);

// GET & POST request to update a magazine
router.get("/magazine/:id/update", magazine_controller.magazine_update_get);
router.post("/magazine/:id/update", magazine_controller.magazine_update_post);

// Get request for a single magazine
router.get("/magazine/:id", magazine_controller.magazine_detail);

// GET request for a list of magazines
router.get("/magazines", magazine_controller.magazine_list);


module.exports = router;