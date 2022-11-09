var selectedRow = null;

// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static displayBooks() {
    const createdBooks = []
    const books = createdBooks;

    books.forEach((book) => Register.addBookToList(book))
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-success btn-sm edit">Edit</a></td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;


    list.appendChild(row);
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('#alert-notice');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Validate
  if(title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else if (selectedRow == null) {
    // Instatiate book
    const book = new Book(title, author, isbn);

    // Add Book to UI
    UI.addBookToList(book);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // Clear fields
    UI.clearFields();
  } else {
      selectedRow.children[0].textContent = title;
      selectedRow.children[1].textContent = author;
      selectedRow.children[2].textContent = isbn;
      selectedRow = null;
      UI.showAlert("Book Edited", "success");
      UI.clearFields();
  }
});

// Event: Edit a Book
document.querySelector("#book-list").addEventListener("click",(e) => {
  target = e.target;
  if(target.classList.contains("edit")){
      selectedRow = target.parentElement.parentElement;
      document.querySelector("#title").value = selectedRow.children[0].textContent;
      document.querySelector("#author").value = selectedRow.children[1].textContent;
      document.querySelector("#isbn").value = selectedRow.children[2].textContent;
  }
});

// Event: Delete a Book
document.querySelector("#book-list").addEventListener("click",(e) => {
  target = e.target;
  if (target.classList.contains("delete")){
      target.parentElement.parentElement.remove();

      // Show success message
      UI.showAlert('Book Removed', 'success');
  }
});
