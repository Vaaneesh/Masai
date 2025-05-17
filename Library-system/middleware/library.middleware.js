const Library = require('../models/library.model');
exports.validateBookData = (req, res, next) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Incomplete Data: Title and Author are required." });
  }
  next();
};
exports.checkBorrowingLimit = async (req, res, next) => {
  const user = req.body.borrowerName; 
  const borrowedBooks = await Library.countDocuments({ borrowerName: user, status: "borrowed" });
  
  if (borrowedBooks >= 3) {
    return res.status(409).json({ message: "Borrowing limit exceeded. A user cannot borrow more than 3 books." });
  }
  next();
};
exports.calculateOverdueFees = async (req, res, next) => {
  const book = await Library.findById(req.params.id);
  const today = new Date();
  
  if (book.dueDate && today > book.dueDate && !book.returnDate) {
    const daysOverdue = Math.ceil((today - book.dueDate) / (1000 * 60 * 60 * 24));
    book.overdueFees = daysOverdue * 10;
    await book.save();
  }
  
  next();
};
