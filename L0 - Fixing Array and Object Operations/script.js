const library = {
    books: [{ title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 }],

    addBook(book) {
        if (!book.title || !book.author || typeof book.year !== 'number') {
            console.log("Book information is incomplete");
            return;
        }
        const existingBook = this.findBookByTitle(book.title);
        if (existingBook) {
            console.log(`Book titled "${book.title}" already exists in the collection.`);
            return;
        }
        this.books.push(book);
        console.log(`Book titled "${book.title}" added to the collection.`);
    },

    findBookByTitle(title) {
        return this.books.find(book => book.title === title);
    },

    removeBook(title) {
        const index = this.books.findIndex(book => book.title === title);

        if (index !== -1) {
            this.books.splice(index, 1);
            console.log(`Book titled "${title}" has been removed from the collection.`);
        } else {
            console.log("Book not found.");
        }
    }
};
library.addBook({ title: "1984", author: "George Orwell", year: 1949 });
library.addBook({ author: "George Orwell", year: 1949 });

