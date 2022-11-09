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
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
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

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 2);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
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

    // Add book to store
    Store.addBook(book);

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

      // Remove book from store
      Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

      // Show success message
      UI.showAlert('Book Removed', 'success');
  }
});





// document.querySelector('#book-form').addEventListener('submit', (e) => {
//   e.preventDefault();

//   const title = document.getElementById('title').value;
//   const author = document.getElementById('name').value;
//   const isbn = document.getElementById('email').value;

//   //instantiate the new book
//   const book = new Book(title, author, isbn);

//   // Storage
//   const books = window.localStorage.getItem('books');
//     if(!books){
//       window.localStorage.setItem('books', JSON.stringify([userData]))
//     }else{
//       const getCurrentBook = window.localStorage.getItem('books')
//       let currentBook = JSON.parse(getCurrentBook)
//       currentBook.push(book)
//       window.localStorage.setItem('books', JSON.stringify(currentBook))
//     }


// })



// function submitForm(e){
//   e.preventDefault();
// let title = document.getElementById('title').value
// let name = document.getElementById('name').value
// let email = document.getElementById('email').value
// let phone = document.getElementById('phone').value
// let gender = document.getElementById('gender').value
// let userData = new User("Miss", "Gladys", "gladys@gmail.com", 08123455677, "female")
//  let newUser = new User(title, name, email, phone, gender);
//  const user = window.localStorage.getItem('users')
//  if(!user){
//   window.localStorage.setItem('users', JSON.stringify([userData]))
//  }else{
//   const getCurrentUser = window.localStorage.getItem('users')
//   let currentUser = JSON.parse(getCurrentUser)
//   currentUser.push(newUser)
//   window.localStorage.setItem('users', JSON.stringify(currentUser))
//  }

// }

// function displayUser(){  
//  const allUsers = window.localStorage.getItem('users')
//  const users = JSON.parse(allUsers)

//  console.log(users)

//   // users.map(user => )
//  return users.map(item => {
//     // console.log(item)
//     return  `
//   <tr>
//     <td>${item.title} ${item.name}</td>
//     <td>${item.gender}</td>
//     <td>${item.phone}</td>
//     <td>${item.email}</td>
//     <td class="actions">
//       <a class="edit" href="http://">Edit</a>
//       <a class="delete" href="http://">Delete</a>
//     </td>


//   </tr>
//       `
  
//   });
// }
// renderPage.innerHTML = displayUser()