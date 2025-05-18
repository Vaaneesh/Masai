const Book = require('../models/book');
const User = require('../models/user');
exports.addBook = async (req, res) => {
    try {
        const { title, author, genre } = req.body;
        const book = new Book({ title, author, genre });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.rentBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);
        if (!user || !book) return res.status(404).json({ error: 'User or Book not found' });
        user.rentedBooks.push(book._id);
        book.rentedBy.push(user._id);
        await user.save();
        await book.save();
        res.status(200).json({ message: 'Book rented successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.returnBook = async (req, res) => {
    try {
    const { userId, bookId } = req.body;
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);
        if (!user || !book) return res.status(404).json({ error: 'User or Book not found' });
        user.rentedBooks.pull(book._id);
        book.rentedBy.pull(user._id);

        await user.save();
        await book.save();

        res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getBookRenters = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId).populate('rentedBy', 'name email');
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.json(book.rentedBy);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateBook = async (req, res) => {
    try {
        const { title, author, genre } = req.body;
        const book = await Book.findByIdAndUpdate(req.params.bookId, { title, author, genre }, { new: true });
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteBook = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findByIdAndDelete(bookId);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        await User.updateMany({}, { $pull: { rentedBooks: bookId } });
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
