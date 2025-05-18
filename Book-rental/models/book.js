const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true,
        minlength: 3
    },
    author: { 
        type: String,
        required: true 
    },
    genre: {
        type: String,
        optional: true
    },
    rentedBy: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
