const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MangaSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  magazine: [{ type: Schema.Types.ObjectId, ref: "Magazine", required: true }],
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre"}],
  original_run: { type: Date, required: true },
  volumes: { type: Number, min: 1, max: 1000, required: true },
  sypnosis: { type: String, required: true },
});

// Virtual for Manga URL
MangaSchema.virtual("url").get(function() {
  return `catalog/book/${this._id}`;
});

module.exports = mongoose.model("Manga", MangaSchema);