const mongoose = require('mongoose');
const bookSchema = require('./item');

bookSchema.statics = {
  // Get all books on the database
  async getAll() {
    return this.find();
  },
  // Get a specific book from the database
  async getById(id) {
    return this.findById(id);
  },
  // Add a new book to the database
  async create(data) {
    const newBook = new this(data);
    await newBook.save();
  },
  // Edit an existing book from the database
  async edit(id, data) {
    await this.findByIdAndUpdate(id, data);
  },
  // Delete a book from the database
  async delete(id) {
    await this.findByIdAndRemove(id);
  },
};

const bookModel = mongoose.model('book', bookSchema);
module.exports = bookModel;
