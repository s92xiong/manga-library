const Magazine = require("../models/magazine");
const Manga = require("../models/manga");

const { body, validationResult } = require("express-validator");
const async = require("async");

// Render a list of magazines
exports.magazine_list = (req, res, next) => {
  Magazine.find()
    .sort([["name", "ascending"]])
    .exec((err, results) => {
    if (err) return next(err);
    res.render("magazine_list", { title: "Magazines", list_magazines: results });
  });
};


// Render a magazine item
exports.magazine_detail = (req, res, next) => {
  async.parallel({
		magazine: function(cb) { Magazine.findById(req.params.id).exec(cb) },
		magazine_manga: function(cb) { Manga.find({ "magazine": req.params.id }).exec(cb) }
	}, (err, results) => {
		if (err) return next(err);
		if (!results.magazine) {
			const someError = new Error("magazine not found");
      someError.status = 404;
      return next(err);
		}
		res.render("magazine_detail", { title: "Magazine Details", magazine: results.magazine, magazine_manga: results.magazine_manga });
	});
};


exports.magazine_create_get = (req, res, next) => {
  res.render("magazine_form", { title: "Create Magazine" });
};

// Render magazine create form
exports.magazine_create_post = [
	// Validate & sanitize the name field
	body("name", "Magazine name required").trim().isLength({ min: 1 }).escape(),

	// Process request
	(req, res, next) => {
		const errors = validationResult(req);

		const magazine = new Magazine({
			name: req.body.name // value of input field
		});

		if (!errors.isEmpty()) {
			res.render("magazine_form", { title: "Create Magazine", magazine: magazine, errors: errors.array() });
		}

		// Prevent duplicate magazine
		Magazine.findOne({ "name": req.body.name }).exec((err1, found_magazine) => {
			if (err1) return next(err1);
			if (found_magazine) {
				res.redirect(found_magazine.url);
			} else {
				magazine.save((err2) => (err2) ? next(err2) : res.redirect("/magazines"));
			}
		});
	}
];


// Render magazine delete form
exports.magazine_delete_get = (req, res, next) => {
  async.parallel({
		magazine: function(cb) { Magazine.findById(req.params.id).exec(cb) },
		manga_list: function(cb) { Manga.find({ "magazine": req.params.id }).exec(cb) }
	}, (err, results) => {
		if (err) return next(err);
		return res.render("magazine_delete", { title: "Delete Magazine", magazine: results.magazine, manga_list: results.manga_list });
	});
};


// Handle magazine delete form
exports.magazine_delete_post = (req, res, next) => {
  async.parallel({
		magazine: function(cb) { Magazine.findById(req.params.id).exec(cb) },
		manga_list: function(cb) { Manga.find({ "magazine": req.params.id }).exec(cb) }
	}, (err, results) => {
		if (err) return next(err);
		if (results.manga_list.length > 0) {
			return res.render("magazine_delete", { title: "Delete Magazine", magazine: results.magazine, manga_list: results.manga_list });
		}

		return Magazine.findByIdAndRemove(req.params.id, function deleteMagazine(err) {
			if (err) return next(err);
			res.redirect("/magazines");
		});
	});
};


// Render magazine update form
exports.magazine_update_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Magazine Update Get');
};


// Handle magazine update form
exports.magazine_update_post = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Magazine Update Post');
};