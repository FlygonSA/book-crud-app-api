require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const apiRutes = require('./api/router');

const app = express();
const router = express.Router();

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

// Middleware

// JSON Parser middleware
app.use(express.json());

// API routes
app.use('/api/books', router);
apiRutes(router);
