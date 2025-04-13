// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    database: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let currentBookPage = 1;
let currentMemberPage = 1;
let itemsPerPage = parseInt(localStorage.getItem('itemsPerPage') || 5);

// Function to fetch and display books from the database
function fetchBooks() {
    db.ref('books').once('value', snapshot => {
        const books = snapshot.val() || {};
        displayBooks(Object.values(books));
    });
}

// Display books on the webpage
function displayBooks(books) {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = '';

    const startIndex = (currentBookPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBooks = books.slice(startIndex, endIndex);

    paginatedBooks.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.innerHTML = `
            <strong>${book.title}</strong> by ${book.author} (${book.genre}) 
            <button onclick="deleteBook('${book.id}')">Delete</button>
        `;
        bookList.appendChild(bookItem);
    });
}

// CRUD: Create new book
document.getElementById('bookForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const newBook = {
        id: generateId(),
        title: document.getElementById('bookTitle').value,
        author: document.getElementById('bookAuthor').value,
        genre: document.getElementById('bookGenre').value,
        publishedYear: parseInt(document.getElementById('bookYear').value),
        available: document.getElementById('bookAvailable').checked
    };
    db.ref('books/' + newBook.id).set(newBook);
    document.getElementById('bookForm').reset();
    fetchBooks();
});

// Delete book
function deleteBook(id) {
    db.ref('books/' + id).remove();
    fetchBooks();
}

// Pagination handlers for books
document.getElementById("nextPage").addEventListener("click", () => {
    currentBookPage++;
    fetchBooks();
});

document.getElementById("prevPage").addEventListener("click", () => {
    if (currentBookPage > 1) {
        currentBookPage--;
        fetchBooks();
    }
});

// Fetch and display members from the database
function fetchMembers() {
    db.ref('members').once('value', snapshot => {
        const members = snapshot.val() || {};
        displayMembers(Object.values(members));
    });
}

// Display members on the webpage
function displayMembers(members) {
    const memberList = document.getElementById("memberList");
    memberList.innerHTML = '';

    members.forEach(member => {
        const memberItem = document.createElement('div');
        memberItem.innerHTML = `
            <strong>${member.name}</strong> (Joined: ${member.membershipDate}) 
            <button onclick="deleteMember('${member.id}')">Delete</button>
        `;
        memberList.appendChild(memberItem);
    });
}

// CRUD: Create new member
document.getElementById('memberForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const newMember = {
        id: generateId(),
        name: document.getElementById('memberName').value,
        membershipDate: document.getElementById('membershipDate').value,
        active: document.getElementById('memberActive').checked
    };
    db.ref('members/' + newMember.id).set(newMember);
    document.getElementById('memberForm').reset();
    fetchMembers();
});

// Delete member
function deleteMember(id) {
    db.ref('members/' + id).remove();
    fetchMembers();
}

// Generate unique ID
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Initial fetch of books and members
fetchBooks();
fetchMembers();
