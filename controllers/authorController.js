const Author = require("../models/author");
const Manga = require("../models/manga");
const Genre = require("../models/genre");
const Magazine = require("../models/magazine");

const async = require("async");

// Display list of all Authors.
exports.author_list = function(req, res, next) {
	Author.find().sort([["family_name", "ascending"]]).exec((err, author_list) => {
		if (err) return next(err);
		return res.render("author_list", { title: "Author List", author_list: author_list });
	});
};

// Display detail page for a specific Author.
exports.author_detail = function(req, res, next) {
	// Things we want to display in the Author Detail:
		// (1) All of the Author's Manga
		// (2) All of the Magazines author is associated with (can be multiple)
		// (3) Genres that author writes for
		
	async.parallel({
		author: function(cb) { Author.findById(req.params.id).exec(cb) },
		manga: function(cb) { Manga.find({ "author": req.params.id }).exec(cb) },
		genre: function(cb) { Genre.find().sort([["name", "ascending"]]).exec(cb) },
	}, (err, results) => {
		if (err) return next(err);
		return res.render("author_detail", { 
			title: "Author", 
			author: results.author,
			manga_list: results.manga,
			genre_list: results.genre,
		});
	});
};

// Display Author create form on GET.
exports.author_create_get = function(req, res, next) {
	res.render("author_form", { title: "Create an Author" });
};

// Handle Author create on POST.
exports.author_create_post = function(req, res, next) {
	res.send('NOT IMPLEMENTED: Author create POST');
};

// Display Author delete form on GET.
exports.author_delete_get = function(req, res, next) {
	res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.author_delete_post = function(req, res, next) {
	res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.author_update_get = function(req, res, next) {
	res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function(req, res, next) {
	res.send('NOT IMPLEMENTED: Author update POST');
};
