const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MagazineSchema = new Schema({
  name: { type: String, minLength: 3, maxLength: 100, required: true }
});

MagazineSchema.virtual("url").get(function() {
  return `/magazine/${this._id}`;
});

module.exports = mongoose.model("Magazine", MagazineSchema);