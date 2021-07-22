const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const MangaSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  magazine: [{ type: Schema.Types.ObjectId, ref: "Magazine" }],
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  original_run_start: { type: Date },
  original_run_end: { type: Date },
  volumes: { type: Number, min: 1, max: 1000, required: true },
  sypnosis: { type: String, required: true },
  image: { type: String, required: true }
});

// Virtual for Manga URL
MangaSchema.virtual("url").get(function() {
  return `/manga/${this._id}`;
});

// Virtual for Manga URL
MangaSchema.virtual("original_run").get(function() {
  // const start = DateTime.fromJSDate(this.original_run_start).toLocaleString(DateTime.DATE_MED);
  // const end = DateTime.fromJSDate(this.original_run_end).toLocaleString(DateTime.DATE_MED);

  if (this.original_run_start && this.original_run_end) {
    return `${DateTime.fromJSDate(this.original_run_start).toLocaleString(DateTime.DATE_MED)} - ${DateTime.fromJSDate(this.original_run_end).toLocaleString(DateTime.DATE_MED)}`;
  } else if (this.original_run_start && !this.original_run_end) {
    return `${DateTime.fromJSDate(this.original_run_start).toLocaleString(DateTime.DATE_MED)} - ongoing`;
  } else if (!this.original_run_start && this.original_run_end) {
    return `N/A - ${DateTime.fromJSDate(this.original_run_start).toLocaleString(DateTime.DATE_MED)}`;
  }
  return "N/A";
});

module.exports = mongoose.model("Manga", MangaSchema);