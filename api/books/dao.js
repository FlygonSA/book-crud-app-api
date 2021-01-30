const mongoose = require("mongoose")
const bookSchema = require("./item")

bookSchema.statics = {
    getAllBooks: () => {
        this.find()
    },
    getBooksById: (id) => {
        this.findById(id)
    },
    editBook: (id,data) => {
        this.findByIdAndUpdate(id,data)
    },
    deleteBook: (id) => {
        this.findByIdAndRemove(id)
    }
}

const bookModel = mongoose.model('Heros', bookSchema);
module.exports = bookModel;