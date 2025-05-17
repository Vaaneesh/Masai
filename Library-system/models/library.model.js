const mongoose = require('mongoose');
const librarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  status: { type: String, default: "available" }, 
  borrowerName: { type: String }, 
  borrowDate: { type: Date },
  dueDate: { type: Date },
  returnDate: { type: Date },
  overdueFees: { type: Number, default: 0 }, 
});

module.exports = mongoose.model('Library', librarySchema);
