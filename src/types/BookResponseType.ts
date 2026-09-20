import { BookType } from "./BookType.js";

type BookResponseType = {
    data: null | BookType | BookType[],
    error: null | string,
    status: number
}

export { BookResponseType }
