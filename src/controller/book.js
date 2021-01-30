const bookDao = require('../dao/book');
const bookModel = require("../model/book")

exports.getAllBooks = async (req, res) => {
  try {
    // Gets all collections on database and returns them
    const allBooks = new bookDao
    res.json(await allBooks.getAll());
  } catch (error) {
    // If no collections are founded it returns a 404 error
    res
      .status(404)
      .json({ message: 'No books were found' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    // Gets a collection by the ID passed on the body
    const book = new bookDao;
    res.json(await book.getById(req.body.id));
  } catch (error) {
    // If no collections are founded it returns a 404 error
    res
      .status(404)
      .json({ message: `No book was found with the ID: ${req.body.id}` });
  }
};

exports.createBook = async (req, res) => {
  try {
    // Creates a collection on the database with the parameters passed on the body
    const book = new bookDao
    await book.create(req.body);
    res.json({ message: 'Book created sucessfully' });
  } catch (error) {
    // Returns a 400 error if one of the parameters on the body is wrong
    res
      .status(400)
      .json({ message: 'There was an error, please try again' });
    throw Error
  }
};

exports.editBook = async (req, res) => {
  // Checks if the collection exists
  if (bookModel.exists({ id: req.body.id })) {
    try {
      // Modfies the collection acording to what is passed on the body
      const book = new bookDao
      await book.edit(req.body.id, req.body);
      res.json({ message: 'Book sucessfully modified' });
    } catch (error) {
      // If one of the parameters of the body is wrong returns a 400 error
      res
        .status(400)
        .json({ message: 'There was an error, please try again' });
    }
  } else {
    // If no collections with the ID passed on the body were found, returns a 404 error
    res
      .status(404)
      .json({ message: `No book was found with the ID: ${req.body.id}` });
  }
};

exports.deleteBook = async (req, res) => {
  // Checks if the collection exists
  if (bookModel.exists({ id: req.body.id })) {
    try {
      // Deletes the collection acording to the ID passed on the body
      const book = new bookDao
      await book.delete(req.body.id);
      res.json({ message: 'Book sucessfully deleted' });
    } catch (error) {
      res
        .status(400)
        .json({ message: 'There was an error, please try again' });
    }
  } else {
    // If no collections with the ID passed on the body were found, returns a 404 error
    res
      .status(404)
      .json({ message: `No book was found with the ID: ${req.body.id}` });
  }
};

