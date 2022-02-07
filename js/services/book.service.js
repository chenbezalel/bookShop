'use strict'

const STORAGE_KEY = 'booksDB';
var gBooks;
_createBooks()



function updateRate(bookId, bookRate){
    var bookIdx = gBooks.findIndex(book => book.id === bookId);
    gBooks[bookIdx].rate = bookRate;
    _saveBooksToStorage();
}

function updatePrice(bookId, bookPrice) {
    var bookIdx = gBooks.findIndex(book => book.id === bookId);
    gBooks[bookIdx].price = bookPrice;
    _saveBooksToStorage();
}

function addBook(name, price) {

    var book = _createBook(name, price);
    gBooks.unshift(book);
    _saveBooksToStorage();

}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(book => book.id === bookId);
    gBooks.splice(bookIdx, 1);

    _saveBooksToStorage();

}

function getBooks() {
    return gBooks;
}

function getBookById(bookId) {
    return gBooks.find((book) => bookId === book.id);
}

function _createBooks() {

    var books = loadFromStorage(STORAGE_KEY)

    if (!books || !books.length) {
        books = [
            _createBook('Don Quixote', '25', 'img/DonQuixote.jpg'),
            _createBook('Lord of the Rings', '20', 'img/Pinocchio.jpg'),
            _createBook('Pinocchio', '10', 'img/LordOfTheRings.jpg')
        ]
    }

    gBooks = books;
    _saveBooksToStorage();

}


function _createBook(name, price, imgUrl = 'img/randomBook.png', rate = 0) {
    return {
        id: makeId(),
        name,
        price,
        imgUrl,
        rate,
        desc: makeLorem()
    }
}


function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}