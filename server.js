require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const BookSchema = require("./model/item")
const app = express()

// Connection to DB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false})

// Handleing connection
const db = mongoose.connection
db.on("error", (error) => {console.error(error)})
db.once("open", () => {console.log("Connected to database")})

//JSON Parser middleware
app.use(express.json())

// Middleware

// Get books from the database
app.get("/api/books", (req, res) => {
	BookSchema.find().then(books => res.json(books))   
})

// Add a new book to the database
app.post("/api/books/create", (req, res) => {
	const NewBook = new BookSchema({name:req.body.name, ISBN:req.body.ISBN})       
	NewBook.save()
		.then(()=>{res.json("Book saved succesfully")})
		.catch(()=>{res.json("There was an error, try again")})
})

// Delete book from database
app.post("/api/books/delete", (req, res) => {
	BookSchema.deleteOne({_id:req.body._id})
		.then(()=>{res.json("Book deleted succesfully")})
		.catch(()=>{res.json("There was an error, try again")})
})

// Modify book from database
app.post("/api/books/modify", (req, res) => {
	//Gets the ID, and modifies the collection acording to the data you send on the rest of the JSON
	BookSchema.findByIdAndUpdate(req.body._id, req.body)
		.then(()=>{res.json("Book modified succesfully")})
		.catch(()=>{res.json("There was an error, try again")})
})

// Confirmation from the server to be running
const Port = app.listen(process.env.PORT || "8080", () => {console.log(`Server running on port ${Port.address().port}`)})