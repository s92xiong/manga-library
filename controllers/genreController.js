const Genre = require('../models/genre');
const Manga = require("../models/manga");

const { body, validationResult } = require("express-validator");
const async = require("async");

// Display list of all Genre.
exports.genre_list = function(req, res, next) {
	Genre.find()
		.sort([["name", "ascending"]])
		.exec((err, results) => {
		if (err) return next(err);
		res.render("genre_list", { title: "Genre Categories", list_genres: results });
	});
};


// Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {
	async.parallel({
		genre: function(cb) { Genre.findById(req.params.id).exec(cb) },
		genre_manga: function(cb) { Manga.find({ "genre": req.params.id }).exec(cb) }
	}, (err, results) => {
		if (err) return next(err);
		if (!results.genre) {
			const someError = new Error("Genre not found");
      someError.status = 404;
      return next(err);
		}
		res.render("genre_detail", { title: "Genre Details", genre: results.genre, genre_manga: results.genre_manga })
	});
};


// Display Genre create form on GET.
exports.genre_create_get = function(req, res, next) {
	res.render("genre_form", { title: "Create Genre" });
};


// Handle Genre create on POST.
exports.genre_create_post = [
	// Validate & sanitize the name field
	body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),

	// Process request
	(req, res, next) => {
		const errors = validationResult(req);

		const genre = new Genre({
			name: req.body.name // value of input field
		});

		if (!errors.isEmpty()) {
			return res.render("genre_form", { title: "Create Genre", genre: genre, errors: errors.array() });
		}

		// Prevent duplicate genre
		Genre.findOne({ "name": req.body.name }).exec((err1, found_genre) => {
			if (err1) return next(err1);
			if (found_genre) {
				res.redirect(found_genre.url);
			} else {
				genre.save((err2) => (err2) ? next(err2) : res.redirect(genre.url));
			}
		});
	}
];


// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res, next) {
	res.send('NOT IMPLEMENTED: Genre delete GET');
};


// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res, next) {
	res.send('NOT IMPLEMENTED: Genre delete POST');
};


// Display Genre update form on GET.
exports.genre_update_get = function(req, res, next) {
	res.send('NOT IMPLEMENTED: Genre update GET');
};


// Handle Genre update on POST.
exports.genre_update_post = function(req, res, next) {
	res.send('NOT IMPLEMENTED: Genre update POST');
};
