import Member from './member.js';
class PremiumMember extends Member {
    constructor(name, borrowedBooks = []) {
        super(name, borrowedBooks);
        this.specialCollectionAccess = true;
    }
    borrowBook(book) {
        if (!book.isAvailable) {
            console.log(`${book.title} is already borrowed.`);
            return;
        }
        if (this.borrowedBooks.length >= 5) {
            console.log(`${this.name} cannot borrow more than 5 books at a time.`);
            return;
        }
        book.isAvailable = false;
        this.borrowedBooks.push(book.title);
        console.log(`${this.name} borrowed ${book.title}.`);
    }
}
export default PremiumMember;
