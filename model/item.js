const Mongoose = require('mongoose')

const Book = new Mongoose.Schema({
  Index: {
    type: Number,
    required: true
  },
  Name: {
    type: String,
    required: true
  },
  Author: {
    type: String
  },
  Year: {
    type: Number
  },
  ISBN: {
    type: Number,
    required: true
  }
})

module.exports = Mongoose.model('Book', Book)
