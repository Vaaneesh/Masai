const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/library.controller');
const libraryMiddleware = require('../middleware/library.middleware');
router.post('/books', libraryMiddleware.validateBookData, libraryController.addBook);
router.patch('/borrow/:id', libraryMiddleware.checkBorrowingLimit, libraryController.borrowBook);
router.patch('/return/:id', libraryMiddleware.calculateOverdueFees, libraryController.returnBook);
router.get('/books', libraryController.getBooks);
router.delete('/books/:id', libraryController.deleteBook);

module.exports = router;
