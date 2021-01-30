const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  Index: {
    type: Number,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
  },
  Year: {
    type: Number,
  },
  ISBN: {
    type: Number,
    required: true,
  },
});

const bookModel = mongoose.model('book', bookSchema);
module.exports = bookModel;
