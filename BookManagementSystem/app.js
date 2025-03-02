import books from './book.js';
const summaries = books.map(book => book.getSummary());
console.log(summaries);
