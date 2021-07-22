const Author = require("../models/author");
const Manga = require("../models/manga");
const Magazine = require("../models/magazine");
const Genre = require("../models/genre");

const { body, validationResult } = require("express-validator");
const async = require("async");
const isImageURL = require('image-url-validator').default;

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
  async.parallel({
    genres: function(cb) { Genre.find().sort([["name ascending"]]).exec(cb) },
    magazines: function(cb) { Magazine.find().sort([["name ascending"]]).exec(cb) },
    authors: function(cb) { Author.find().sort([["name ascending"]]).exec(cb) }
  }, (err, results) => {
    if (err) return next(err);
    res.render("manga_form", { title: "Create a new Manga", genres: results.genres, magazines: results.magazines, authors: results.authors });
  });
};


// Handle creating a manga
exports.manga_create_post = [
  // Validate and sanitize the input fields:
  body("title", "Title field must not be empty").trim().isLength({ min: 1 }).escape(),
  body("author", "Author field must not be empty").trim().isLength({ min: 1 }).escape(),

  body("magazine.*", "Magazine field must not be empty").escape(),
  body("genre.*", "Genre field must not be empty").escape(),

  body("original_run_start", "Start date must not be empty").optional({ checkFalsy: true }).isISO8601().toDate(),
	body("original_run_end", "End date must not be empty").optional({ checkFalsy: true }).isISO8601().toDate(),

  body("volumes").trim().isLength({ min: 1 }).escape().withMessage("Volumes field must contain value.").isNumeric().withMessage("Volumes field must contain a numeric value"),

  body("sypnosis", "Sypnosis field must not be empty").trim().isLength({ min: 1 }).escape(),
  body("image", "Image field must not be empty").trim().isLength({ min: 1 }),

  // Validate that the image field is an image
  (req, res, next) => {
    const manga = new Manga({
      title: req.body.title,
      author: req.body.author,
      magazine: req.body.magazine,
      genre: req.body.genre,
      original_run_start: req.body.original_run_start,
      original_run_end: req.body.original_run_end,
      volumes: req.body.volumes,
      sypnosis: req.body.sypnosis,
      image: req.body.image
    });

    async.parallel({
      genres: function(cb) { Genre.find().sort([["name ascending"]]).exec(cb) },
      magazines: function(cb) { Magazine.find().sort([["name ascending"]]).exec(cb) },
      authors: function(cb) { Author.find().sort([["name ascending"]]).exec(cb) },
    }, (err, results) => {
      if (err) return next(err);
      
      isImageURL(req.body.image).then(promiseResult => {
        if (!promiseResult) {
          return res.render("manga_form", { title: "Create a new Manga", genres: results.genres, magazines: results.magazines, authors: results.authors, manga: manga, invalidImg: "Invalid image" });
        } else {
          return next();
        }
      }).catch(err => {
        console.error(err);
        return next(err);
      })
    });
  },

  // Process req for all input fields
  (req, res, next) => {
    const error = validationResult(req);

    const manga = new Manga({
      title: req.body.title,
      author: req.body.author,
      magazine: req.body.magazine,
      genre: req.body.genre,
      original_run_start: req.body.original_run_start,
      original_run_end: req.body.original_run_end,
      volumes: req.body.volumes,
      sypnosis: req.body.sypnosis,
      image: req.body.image
    });

    if (!error.isEmpty()) {
      async.parallel({
        genres: function(cb) { Genre.find().sort([["name ascending"]]).exec(cb) },
        magazines: function(cb) { Magazine.find().sort([["name ascending"]]).exec(cb) },
        authors: function(cb) { Author.find().sort([["name ascending"]]).exec(cb) }
      }, (err, results) => {
        if (err) return next(err);
        return res.render("manga_form", { title: "Create a new Manga", genres: results.genres, magazines: results.magazines, authors: results.authors, manga: manga, errors: error.array() });
      });
    }
    manga.save(err => err ? next(err) : res.redirect(manga.url));
  }
];


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