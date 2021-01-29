require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bookSchema = require('./api/books/item');

const app = express();

// Connection to db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Handleing connection
const db = mongoose.connection;
db.on('error', (error) => { console.error(error); });
db.once('open', () => { console.log('Connected to database'); });

// Confirmation from the server to be running
const port = app.listen(process.env.PORT || '8080', () => { console.log(`Server running on port ${port.address().port}`); });

// JSON Parser middleware
app.use(express.json());

// Middleware

// Get books from the database
app.get('/api/books', async (req, res) => {
  try {
    const books = await bookSchema.find();
    res.json(books);
  } catch (error) {
    res
      .status(404)
      .json({ message: 'No books were found' });
  }
});

// Add a new book to the database
app.post('/api/books/create', async (req, res) => {
  const newBook = new bookSchema(req.body);
  try {
    await newBook.save();
    res.json({ message: 'Book created sucessfully' });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'There was an error, try again' });
  }
});

// Delete book from database
app.post('/api/books/delete', async (req, res) => {
  if (bookSchema.exists({ id: req.body.id })) {
    try {
      await bookSchema.findByIdAndDelete(req.body.id);
      res.json({ message: 'Book sucessfully deleted' });
    } catch (error) {
      res
        .status(400)
        .json({ message: 'There was an error, please try again' });
    }
  } else {
    res
      .status(404)
      .json('Book missing from database');
  }
});

// Modify book from database
app.post('/api/books/modify', async (req, res) => {
  // Gets the ID, and modifies the collection acording to the data you send on the rest of the JSON
  if (bookSchema.exists({ id: req.body.id })) {
    try {
      await bookSchema.findByIdAndUpdate(req.body.id, req.body);
      res.json({ message: 'Book sucessfully modified' });
    } catch (error) {
      res
        .status(400)
        .json({ message: 'There was an error, please try again' });
    }
  } else {
    res
      .status(404)
      .json('Book missing from database');
  }
});
