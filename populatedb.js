const async = require('async');
const Manga = require("./models/manga");
const Author = require("./models/author");
const Magazine = require("./models/magazine");
const Genre = require("./models/genre");

// // Get arguments passed on command line
const userArgs = process.argv.slice(2);

const mongoose = require("mongoose");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

const authors = [];
const genres = [];
const mangas = [];
const magazines = [];

function authorCreate(first_name, family_name, d_birth, d_death, cb) {
  authordetail = {
    first_name: first_name,
    family_name: family_name
  };

  // If given a birth or death, add it to the object
  if (d_birth != false) authordetail.date_of_birth = d_birth;
  if (d_death != false) authordetail.date_of_death = d_death;

  // Create an instance of the Author model
  const author = new Author(authordetail);

  // Save the new model instance, passing a callback
  author.save((err) => {
    if (err) return cb(err, null);
    console.log(`New Author: ${author}`);
    authors.push(author);
    return cb(null, author);
  });
}

function genreCreate(name, cb) {
  const someGenre = { name: name }
  const genre = new Genre(someGenre);
  genre.save(function(err) {
    if (err) return cb(err, null);
    console.log(`New Genre: ${genre}`);
    genres.push(genre);
    cb(null, genre);
  });
}

function mangaCreate(title, author, magazine, genre, original_run_start, original_run_end, volumes, sypnosis, image, cb) {
  const mangaDetail = {
    title: title,
    author: author,
    magazine: magazine,
    volumes: volumes,
    sypnosis: sypnosis,
  };

  if (genre != false) mangaDetail.genre = genre;
  if (original_run_start != false) mangaDetail.original_run_start = original_run_start;
  if (original_run_end != false) mangaDetail.original_run_end = original_run_end;
  if (image != false) mangaDetail.image = image;

  const manga = new Manga(mangaDetail);
  manga.save((err) => {
    if (err) return cb(err, null);
    console.log(`New Manga: ${manga}`);
    mangas.push(manga);
    return cb(null, manga);
  });
}

function magazineCreate(name, cb) {
  const magazine = new Magazine({ name: name });
  magazine.save((err) => {
    if (err) return cb(err, null);
    console.log(`New Magazine: ${magazine}`);
    magazines.push(magazine);
    return cb(null, magazine);
  });
}

function createGenreAuthors(cb) {
  async.series([
    function(callback) {
      authorCreate("Kentaro", "Miura", "1966-07-11", "2021-05-06", callback);
    },
    function(callback) {
      authorCreate("Makoto", "Yukimura", "1976-05-08", false, callback);
    },
    function(callback) {
      genreCreate("Dark fantasy", callback);
    },
    function(callback) {
      genreCreate("Adventure", callback);
    },
  ], cb);
}

function createMagazines(cb) {
  async.series([
    function(callback) {
      magazineCreate("Young Animal", callback);
    },
    function(callback) {
      magazineCreate("Monthly Afternoon", callback);
    },
  ], cb);
}

function createMangas(cb) {
  async.parallel([
    function(callback) {
      mangaCreate("Berserk", authors[0], magazines[0], [genres[0]], "August 1989", false, 40, 'Guts, a former mercenary now known as the "Black Swordsman," is out for revenge. After a tumultuous childhood, he finally finds someone he respects and believes he can trust, only to have everything fall apart when this person takes away everything important to Guts for the purpose of fulfilling his own desires. Now marked for death, Guts becomes condemned to a fate in which he is relentlessly pursued by demonic beings.', "https://images-na.ssl-images-amazon.com/images/I/91oSUA0bSuL.jpg", callback);
    },
    function(callback) {
      mangaCreate("Vinland Saga", authors[1], magazines[1], [genres[1]], "April 2005", false, 24, `Thorfinn, son of one of the Vikings' greatest warriors, is among the finest fighters in the merry band of mercenaries run by the cunning Askeladd, an impressive feat for a person his age. However, Thorfinn is not part of the group for the plunder it entails—instead, for having caused his family great tragedy, the boy has vowed to kill Askeladd in a fair duel. Not yet skilled enough to defeat him, but unable to abandon his vengeance, Thorfinn spends his boyhood with the mercenary crew, honing his skills on the battlefield among the war-loving Danes, where killing is just another pleasure of life.`, "https://images-na.ssl-images-amazon.com/images/I/91+Qs9DaFZL.jpg", callback);
    }
  ], cb);
}

async.series([
  createGenreAuthors,
  createMagazines,
  createMangas
], (err, results) => {
  if (err) { 
    console.log(`FINAL ERR: ${err}`);
  } else {
    console.log(`Mangas: ${mangas}`);
  }
  mongoose.connection.close();
});