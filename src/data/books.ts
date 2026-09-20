import { BookType } from "../types/BookType.js"
//BookType[]
const books: Array<BookType> = [
  {
    id: 1,
    title: "Кобзар",
    price: 250,
    is_active: true,
    image: "Lake.jpg"
  },
  {
    id: 2,
    title: "Тигролови",
    price: 320,
    is_active: true,
    image: "sun.jpg"
  },
  {
    id: 3,
    title: "1984",
    price: 400,
    is_active: true
  },
  {
    id: 4,
    title: "Гаррі Поттер",
    price: 450,
    is_active: false
  },
  {
    id: 5,
    title: "Маленький принц",
    price: 280,
    is_active: true
  }
];

export { books };