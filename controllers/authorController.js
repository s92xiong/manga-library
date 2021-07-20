const Author = require("../models/author");
const Manga = require("../models/manga");

const { body, validationResult } = require("express-validator");

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
	async.parallel({
		author: function(cb) { Author.findById(req.params.id).exec(cb) },
		manga: function(cb) { Manga.find({ "author": req.params.id }).exec(cb) },
	}, (err, results) => {
		if (err) return next(err);
		return res.render("author_detail", { title: "Author", author: results.author, manga_list: results.manga });
	});
};

// Display Author create form on GET.
exports.author_create_get = function(req, res, next) {
	res.render("author_form", { title: "Create an Author" });
};

// Handle Author create on POST.
exports.author_create_post = [
	body("first_name").trim().isLength({ min: 1 }).escape().withMessage("First name must be specified.").isAlphanumeric().withMessage("First name has non-alphanumeric characters"),
	body("family_name").trim().isLength({ min: 1 }).escape().withMessage("Family name must be specified.").isAlphanumeric().withMessage("Family name has non-alphanumeric characters"),
	body("date_of_birth", "Invalid date of birth").optional({ checkFalsy: true }).isISO8601().toDate(),
	body("date_of_death", "Invalid date of death").optional({ checkFalsy: true }).isISO8601().toDate(),

	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.render("author_form", { title: "Create an Author", errors: errors.array() });

		const author = new Author({
			first_name: req.body.first_name,
			family_name: req.body.family_name,
			date_of_birth: req.body.date_of_birth,
			date_of_death: req.body.date_of_death
		});

		author.save((err) => {
			if (err) return next(err);
			res.redirect(author.url);
		});
	}
];

// Display Author delete form on GET.
exports.author_delete_get = function(req, res, next) {
	async.parallel({
		author: function(cb) { Author.findById(req.params.id).exec(cb) },
		manga_list: function(cb) { Manga.find({ "author": req.params.id }).exec(cb) }
	}, (err, results) => {
		if (err) return next(err);
		return res.render("author_delete", { title: "Delete Author", author: results.author, manga_list: results.manga_list });
	});
};

// Handle Author delete on POST.
exports.author_delete_post = (req, res, next) => {
	async.parallel({
		author: function(cb) { Author.findById(req.params.id).exec(cb) },
		manga_list: function(cb) { Manga.find({ "author": req.params.id }).exec(cb) }
	}, (err, results) => {
		if (err) return next(err);
		if (results.manga_list > 0) {
			return res.render("author_delete", { title: "Delete Author", author: results.author, manga_list: results.manga_list });
		}
		
		return Author.findByIdAndRemove(req.params.id, function deleteAuthor(err) {
			if (err) return next(err);
			res.redirect("/authors");
		});
	});
};

// Display Author update form on GET.
exports.author_update_get = function(req, res, next) {
	res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function(req, res, next) {
	res.send('NOT IMPLEMENTED: Author update POST');
};
