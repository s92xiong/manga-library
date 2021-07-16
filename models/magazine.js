const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MagazineSchema = new Schema({
  name: { type: String, minLength: 3, maxLength: 100, required: true }
});

MagazineSchema.virtual("url").get(function() {
  return `/catalog/magazine/${this._id}`;
});

module.exports = mongoose.model("Genre", MagazineSchema);