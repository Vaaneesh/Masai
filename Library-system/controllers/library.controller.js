const Library = require('../models/library.model');
exports.addBook = async (req, res) => {
  try {
    const newBook = new Library(req.body);
    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error });
  }
};
exports.borrowBook = async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found." });
    if (book.status !== "available") return res.status(409).json({ message: "Book is not available." });

    book.status = "borrowed";
    book.borrowerName = req.body.borrowerName;
    book.borrowDate = new Date();
    book.dueDate = new Date();
    book.dueDate.setDate(book.borrowDate.getDate() + 14); 

    await book.save();
    res.status(200).json({ message: "Book borrowed successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error borrowing book", error });
  }
};
exports.returnBook = async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found." });
    
    book.status = "available";
    book.returnDate = new Date();
    await book.save();
    await calculateOverdueFees(req, res, () => {});

    res.status(200).json({ message: "Book returned successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error returning book", error });
  }
};
exports.getBooks = async (req, res) => {
  try {
    const { status, title } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (title) filter.title = new RegExp(title, 'i'); 

    const books = await Library.find(filter);
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books", error });
  }
};
exports.deleteBook = async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found." });
    if (book.status === "borrowed") return res.status(409).json({ message: "Cannot delete borrowed book." });

    await Library.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted successfully." });

  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};
