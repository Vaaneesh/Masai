import Book from './book.js';
class Member {
    constructor(name, borrowedBooks = []) {
        this.name = name;
        this.borrowedBooks = borrowedBooks;
    }

    borrowBook(book) {
        if (!book.isAvailable) {
            console.log(`${book.title} is already borrowed.`);
            return;
        }
        if (this.borrowedBooks.length >= 3) {
            console.log(`${this.name} cannot borrow more than 3 books at a time.`);
            return;
        }
        book.isAvailable = false;
        this.borrowedBooks.push(book.title);
        console.log(`${this.name} borrowed ${book.title}.`);
    }
}

export default Member;
