const mongoose = require("mongoose")

const Book = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ISBN:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("Book", Book)