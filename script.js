// global variables
let myLibrary = [];

// Create Book object
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// Book prototye function
Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead;
}

const addBookBtn = document.getElementById('addBookBtn')
const addBookModal = document.getElementById('addBookModal')
const overlay = document.getElementById('overlay')
const addBookForm = document.getElementById('addBookForm')
const newBookForm = document.querySelector('#addBookForm');

// Click 'Add a new book' Button
addBookBtn.onclick = () => {
    addBookForm.reset()
    addBookModal.classList.add('active')
    overlay.classList.add('active')
}

/*
document.querySelector('#addBookBtn').addEventListener('click', function() {
    //let newBookForm = document.querySelector('#addBookForm');
    //newBookForm.style.display = 'flex';
})
*/

// Submit 'Add a new book' Form
addBookForm.onsubmit = (event) => {
    event.defaultPrevented;
    addBookToLibrary();
}

/*
document.querySelector('#addBookForm').addEventListener('submit', function(event) {
    //alert('hi');
    event.defaultPrevented;
    addBookToLibrary();
})
*/

// Called once 'Add a new book' Form is Submitted
// Calls render in its turn
function addBookToLibrary() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let isRead = document.querySelector('#isRead').checked;

    let newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);

    //console.log(newBook);
    render(); 

    addBookModal.classList.remove('active')
    overlay.classList.remove('active')
}

// Render all book cards
function render() {
    let libraryEl = document.querySelector('#library-grid');
    libraryEl.innerHTML = '';
    for (let i = 0; i <myLibrary.length; i++) {
        let book = myLibrary[i];
        let bookEl = document.createElement('div');
        //bookEl.setAttribute('class', 'book-card');
        bookEl.innerHTML = `
        <br>
        <div class="book-card">
            <p class="title">${book.title}</p>
            <p class="author">${book.author}</p>
            <p class="pages">${book.pages}</p>
            <button class="btn toggle-read-btn" onclick="toggleRead(${i})">${book.isRead ? "Read" : "Not Read Yet"}</button>
            <button class="btn remove-book-btn" onclick="removeBook(${i})">Remove</button>
        </div>
        <br>
        `;
        libraryEl.appendChild(bookEl);
    }
}

// Remove Book - <button class="remove-book-btn" onclick="removeBook(${i})">...</button>
function removeBook(index) {
    myLibrary.splice(index, 1); // removes from array
    render(); // removes from div
}

// Toggle read - <button class="toggle-read-btn" onclick="toggleRead(${i})">...</button>
function toggleRead(index) {
    myLibrary[index].toggleRead();
    render(); // refresh
}