// global variables
let myLibrary = [];

// Create Book object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Book prototye function
Book.prototype.toggleRead = function() {
    this.read = !this.read;
}


// Click 'Add a new book' Button
document.querySelector('#new-book-btn').addEventListener('click', function() {
    let newBookForm = document.querySelector('#new-book-form');
    newBookForm.style.display = 'block';
})

// Submit 'Add a new book' Form
document.querySelector('#new-book-form').addEventListener('submit', function(event) {
    //alert('hi');
    event.defaultPrevented;
    addBookToLibrary();
})

// Called once 'Add a new book' Form is Submitted
// Calls render in its turn
function addBookToLibrary() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').checked;

    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    //console.log(newBook);
    render(); 
}

// Render all book cards
function render() {
    let libraryEl = document.querySelector('#library');
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
            <button class="toggle-read-btn" onclick="toggleRead(${i})">${book.read ? "Read" : "Not Read Yet"}</button>
            <button class="remove-book-btn" onclick="removeBook(${i})">Remove</button>
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