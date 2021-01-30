const book = require('./dao');

const controller = {};

controller.getAllBooks = async (req, res) => {
  try {
    // Gets all collections on database and returns them
    const allBooks = await book.getAll({});
    res.json(allBooks);
  } catch (error) {
    // If no collections are founded it returns a 404 error
    res
      .status(404)
      .json({ message: 'No books were found' });
  }
};

controller.getBookById = async (req, res) => {
  try {
    // Gets a collection by the ID passed on the body
    const bookReturned = await book.getById(req.body.id);
    res.json(bookReturned);
  } catch (error) {
    // If no collections are founded it returns a 404 error
    res
      .status(404)
      .json({ message: `No book was found with the ID: ${req.body.id}` });
  }
};

controller.createBook = async (req, res) => {
  try {
    // Creates a collection on the database with the parameters passed on the body
    await book.create(req.body);
    res.json({ message: 'Book created sucessfully' });
  } catch (error) {
    // Returns a 400 error if one of the parameters on the body is wrong
    res
      .status(400)
      .json({ message: 'There was an error, please try again' });
  }
};

controller.editBook = async (req, res) => {
  // Checks if the collection exists
  if (book.exists({ id: req.body.id })) {
    try {
      // Modfies the collection acording to what is passed on the body
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

controller.deleteBook = async (req, res) => {
  // Checks if the collection exists
  if (book.exists({ id: req.body.id })) {
    try {
      // Deletes the collection acording to the ID passed on the body
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

module.exports = controller;
