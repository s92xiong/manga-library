const Genre = require('../models/genre');

// Display list of all Genre.
exports.genre_list = function(req, res, next) {
	Genre.find()
		.sort([["name", "ascending"]])
		.exec((err, results) => {
		if (err) return next(err);
		res.render("index", { categories: "Genre Categories", list_genres: results });
	});
};


// Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {
	res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
};


// Display Genre create form on GET.
exports.genre_create_get = function(req, res, next) {
	res.send('NOT IMPLEMENTED: Genre create GET');
};


// Handle Genre create on POST.
exports.genre_create_post = function(req, res, next) {
	res.send('NOT IMPLEMENTED: Genre create POST');
};


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
