'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {

    var books = getBooks();

    var strHtml = books.map(book =>
        `
        <tr>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td><button class="read" onclick="onReadBook('${book.id}')">read</button></td>
            <td><button class="update" onclick="onUpdateBook('${book.id}')">update</button></td>
            <td><button class="delete" onclick="onRemoveBook('${book.id}')">delete</button></td>
            <td>${book.rate}</td>
        </tr>
        `
    )
    document.querySelector('tbody').innerHTML = strHtml.join('');

}

function onReadBook(bookId) {
    var book = getBookById(bookId);
    var elModal = document.querySelector('.modal');
    elModal.querySelector('.book-name').innerText = book.name;
    elModal.querySelector('.img-box').innerHTML =
        `<img src=${book.imgUrl} alt=""></img>`;
    elModal.querySelector('p').innerText = book.desc;
    elModal.querySelector('h4 span').innerText = book.price;
    elModal.querySelector('.rate').innerText = book.rate;
    elModal.querySelector('.save-rate').innerHTML =
        `<button class="save-rate-btn" onclick="OnSaveRate('${book.id}')">save rate</button>`
    elModal.classList.add('open');
}

function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.classList.remove('open');
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onChangeRating(diff) {
    var elRate = document.querySelector('.rate');
    var currRate = +elRate.innerText;
    if (currRate === 0 && diff === -1 ||
        currRate === 10 && diff === 1) return;
    elRate.innerText = currRate + diff;
}

function OnSaveRate(bookId){
    var elRate = document.querySelector('.rate');
    var bookRate = +elRate.innerText;
    updateRate(bookId, bookRate);
    var elModal = document.querySelector('.modal');
    elModal.classList.remove('open');
    renderBooks();
}

function onAddBook() {
    var name = prompt('enter the name of the book:')
    var price = prompt('enter the price of the book:')
    addBook(name, price);
    renderBooks();
}

function onUpdateBook(bookId) {
    var bookPrice = prompt('enter the new price of the book:')
    updatePrice(bookId, bookPrice);
    renderBooks();
}