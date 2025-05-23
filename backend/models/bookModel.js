const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title!"],
  },
  chapters: {
    type: Number,
    required: [true, "Please provide the number of chapters!"],
  },
  author: String,
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
