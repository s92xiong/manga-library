const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { DateTime } = require("luxon");

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function() {
  return `${this.family_name}, ${this.first_name}`;
});

// Virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(function() {
  let lifetime_string = "";
  if (this.date_of_birth) {
    lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
  }
  lifetime_string += " - ";
  if (this.date_of_death) {
    lifetime_string = DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
  }
  return lifetime_string;
});

// Virtual to format date of birth/death
AuthorSchema.virtual('years_alive').get(function () {
  if (this.date_of_death) {
    return `${DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)} - ${DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)}`;
  } else if (this.date_of_birth) {
    return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
  } else {
    return "";
  }
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function() {
  return `/author/${this._id}`;
});

module.exports = mongoose.model("Author", AuthorSchema);