const Mongoose = require('mongoose')

const Book = new Mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  ISBN: {
    type: Number,
    required: true
  }
})

module.exports = Mongoose.model('Book', Book)
