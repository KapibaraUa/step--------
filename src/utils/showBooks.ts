import { BookType } from "../types/BookType.js";

type showBookType = (book:BookType)=>string;
type showBooksType = (book:Array<BookType>)=>string;
type getBooksByTitleType = (title:string, books:Array<BookType>)=>Array<BookType>;

const showBook:showBookType = (book)=>{
    return `<div class="book-card">
<h2 class="book-title">${book.title}</h2>

  <p class="book-price">${book.price} грн</p>

  <span class="book-status active">${book.is_active?"В наявності":"Немає"}</span>

  <a href="book/?id=${book.id}"  class="book-button">Купити</a>
</div>`
}

const showAllBooks:showBooksType = (books)=>{
    let books_content:string = ""
    books.forEach((book,index)=>{
    if(index==0)
        books_content+=`<html><head><link rel="stylesheet" href="book.css"></head><body><div class="container">`
        books_content+=showBook(book)
    });
    books_content+=`</div></body></html>`
    return books_content
}

const getBooksByTitle:getBooksByTitleType = (title, books)=>{
    return books.filter(book=>book.title.toLowerCase().includes(title.toLowerCase()))
}

export {showAllBooks, showBook, getBooksByTitle}