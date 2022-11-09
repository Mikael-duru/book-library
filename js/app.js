

let renderBook = document.querySelector('#render')


async function bookInfo(){
    let response = await fetch('https://randomuser.me/api/')
    let bookData = await response.json()
    let books = bookData.results

    books.forEach(book => {
        console.log(book)
        renderBook.innerHTML = `
        <div id="book-list">
            <p>Title: ${book.title}</p>
            <p>Author: ${book.author} </p>
            <p>ISBN#: ${book.isbn}</p>
        </div>
        `
    });
    
}



bookInfo();