'use strict'

const KEY = 'books';
const NUM_BOOK_PAGE = 4;
var gBooks;
var gImgBooks = ['Harry-Potter', 'charli', 'kipa-doma', 'lord']
var gSoryBy = '';
var gPageIdx = 0;


_createBooks()


function bookForDisplay() {
    var idxToStart = gPageIdx * NUM_BOOK_PAGE;
    var books = gBooks.slice(idxToStart, idxToStart + NUM_BOOK_PAGE);
    document.querySelector('.btns-book span').innerText = `Page: ${gPageIdx + 1}`;
    return books;
}


function addBook(name, price) {
    var book = _createBook(name, price)
    gBooks.push(book)
    _savebooksToStorage();

}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    gBooks.splice(bookIdx, 1)
    _savebooksToStorage()
}

function updateBook(bookId, price) {
    var book = gBooks.find(function (book) {
        return book.id === bookId
    })
    book.price = price;

}


function _createBook(name, price) {
    return {
        id: makeId(),
        name: name,
        price: (!price) ? getRandomIntInclusive(200, 300) : price,
        imgUrl: name,
        rate: 0
    }
}

function _getImgUrl() {
    var randomNum = getRandomIntInclusive(0, 3)
    return gImgBooks[randomNum]
}

function _createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        books = []

        books.push(_createBook('Harry-Potter'))
        books.push(_createBook('charli'))
        books.push(_createBook('kipa-doma'))
        books.push(_createBook('lord'))
    }
    gBooks = books;
    _savebooksToStorage();
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return book.id === bookId
    })
    return book;
}

function _savebooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function getBookForDisplay() {
    return gBooks
}

function setTheSort(value) {
    gSoryBy = value;
    setByTheSort(gSoryBy, books)

}

function setBookRate(bookId, rate) {
    var book = getBookById(bookId)
    console.log('book', book);
    book.rate = rate;
    _savebooksToStorage()
}

function backPage() {
    if (gPageIdx > 0) {
        gPageIdx--;

    } return;
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * NUM_BOOK_PAGE >= gBooks.length) gPageIdx = 0;
}

function setByTheSort(gSoryBy, books) {
    books.sort(function (book1, book2) {
        console.log('book1', book1);
        console.log('book2', book2);
        if (book1[gSoryBy] < book2[gSoryBy]) return -1;
        if (book1[gSoryBy] > book2[gSoryBy]) return 1;
        return 0;
    })
    return
}