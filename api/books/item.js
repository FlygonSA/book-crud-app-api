const mongoose = require('mongoose');

const book = new mongoose.Schema({
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

module.exports = book
