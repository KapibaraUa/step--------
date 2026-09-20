type BookType = {
    id:number,
    title:string,
    price:number,
    is_active:boolean,
    image?:string,
    create_time?:string | Date
}
type BookCreateType = Omit<BookType, "id">

export {BookType, BookCreateType}