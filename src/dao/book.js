const bookModel = require('../model/book');

class BookDao{
  // Get all books on the database
  async getAll() {
    return bookModel.find();
  }
  // Get a specific book from the database
  async getById(id) {
    return bookModel.findById(id);
  }
  // Add a new book to the database
  async create(data) {
    const newBook = new bookModel(data);
    await newBook.save();
  }
  // Edit an existing book from the database
  async edit(id, data) {
    await bookModel.findByIdAndUpdate(id, data);
  }
  // Delete a book from the database
  async delete(id) {
    await bookModel.findByIdAndRemove(id);
  }
}

module.exports = BookDao

