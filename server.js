require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const BookSchema = require('./model/item');

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
app.get('/api/books', (req, res) => {
  BookSchema.find().then((books) => res.json(books));
});

// Add a new book to the database
app.post('/api/books/create', (req, res) => {
  const newBook = new BookSchema(req.body);
  newBook.save()
    .then(() => { res.json('Book saved succesfully'); })
    .catch(() => { res.json('There was an error, try again'); });
});

// Delete book from database
app.post('/api/books/delete', (req, res) => {
  if (BookSchema.exists({ id: req.body.id })) {
    BookSchema.findByIdAndDelete(req.body.id)
      .then(() => { res.json('Book deleted succesfully'); })
      .catch(() => { res.json('There was an error, try again'); });
  } else {
    res.status(404).json('Book missing from database');
  }
});

// Modify book from database
app.post('/api/books/modify', (req, res) => {
  // Gets the ID, and modifies the collection acording to the data you send on the rest of the JSON
  if (BookSchema.exists({ id: req.body.id })) {
    BookSchema.findByIdAndUpdate(req.body.id, req.body)
      .then(() => { res.json('Book modified succesfully'); })
      .catch(() => { res.json('There was an error, try again'); });
  } else {
    res.status(404).json('Book missing from database');
  }
});
