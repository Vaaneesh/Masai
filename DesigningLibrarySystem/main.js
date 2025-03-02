import Book from './book.js';
import Member from './member.js';
import PremiumMember from './premiumMember.js';

const book1 = new Book('To Kill a Mockingbird', 'Harper Lee');
const book2 = new Book('1984', 'George Orwell');
const book3 = new Book('The Great Gatsby', 'F. Scott Fitzgerald');
const book4 = new Book('Moby Dick', 'Herman Melville');
const book5 = new Book('Fahrenheit 451', 'Ray Bradbury');
const regularMember = new Member('Alice');
const premiumMember = new PremiumMember('Bob');

regularMember.borrowBook(book1); 
regularMember.borrowBook(book2); 
regularMember.borrowBook(book3); 
regularMember.borrowBook(book4); 
premiumMember.borrowBook(book1);
premiumMember.borrowBook(book2);
premiumMember.borrowBook(book3); 
premiumMember.borrowBook(book4); 
premiumMember.borrowBook(book5); 
console.log('Book Availability:');
console.log(`${book1.title} available: ${book1.isAvailable}`); 
console.log(`${book2.title} available: ${book2.isAvailable}`); 
console.log(`${book3.title} available: ${book3.isAvailable}`); 
console.log(`${book4.title} available: ${book4.isAvailable}`); 
console.log(`${book5.title} available: ${book5.isAvailable}`); 
