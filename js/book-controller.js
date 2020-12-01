'use strict'

function init() {
    _renderBooks()
}

function _renderBooks() {
    var books = bookForDisplay();
    var strHtmls = books.map(function (book) {
        return ` <tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}$</td>
        <td><input oninput="onRateBook('${book.id}')" type="number" class="quantity" name="quantity" min="1" max="10"></td>
        <td><button class="read" onclick="onRead('${book.id}')">Read</button></td>
        <td><button class="update" onclick="onUpdate('${book.id}')">Update</button></td>
        <td><button class="delete" onclick="onDelete('${book.id}')">Delete</button></td>
        
        </tr> `

    })
    document.querySelector('.table-container tbody').innerHTML = strHtmls.join('')

}

function onRead(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal');
    var elImg = document.querySelector('.book-pic');
    elImg.innerHTML = `<img class="card-img-top" src="img/${book.imgUrl}.jpg">`;
    elModal.querySelector('h5').innerText = makeLorem(50);
    elModal.hidden = false;

}

function onUpdate(bookId) {
    var price = +prompt('what the new price?');
    while (isNaN(price)) {
        price = +prompt('what the new price?');
    }
    updateBook(bookId, price, name)
    _renderBooks()
}

function onDelete(bookId) {
    if (!confirm('You are sure want to delete?')) return;
    removeBook(bookId)
    _renderBooks()
}

function onAddBook() {
    var newBook = prompt('What the name?');
    var priceBook = +prompt('What the price?')
    if (!newBook || !priceBook) return
    addBook(newBook, priceBook)
    _renderBooks()

}

function onCloseModal() {
    document.querySelector('.modal').hidden = true;
}

function onRateBook(bookId) {
    var elInput = document.querySelector('input[name=quantity]');
    var rate = +elInput.value;
    setBookRate(bookId, rate);
}

function onSortBy(value) {
    console.log(value);
    setTheSort(value);
    _renderBooks();

}

function onBackPage() {
    backPage();
    _renderBooks();
}
function onNextPage() {
    nextPage();
    _renderBooks();
}