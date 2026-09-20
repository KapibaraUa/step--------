import http from "node:http"
import fs from "node:fs"
import path from "node:path"
import { URL } from "node:url"
import 'dotenv/config'
import { books } from "./data/books.js"
import { showAllBooks, showBook } from "./utils/showBooks.js"
import { BookType } from "./types/BookType.js"

/*
https://shop.com/product/?name=phone&price=1000&key=value&key2=value2  - query params
https://shop.com/category/phones/32  - params
http://localhost:4200/books
params
query params
body
GET POST PUT PATCH DELETE
CRUD - Create Read Update Delete
REST API 
*/
const server = http.createServer((req,res)=>{
    const url = new URL(req.url ?? "/", `http://${req.headers.host}`)
    const PATH_TO_PAGES = path.join("src","pages") 
    if(req.method==="GET" &&  req.url==='/books')
    {
        const books_content:string = showAllBooks(books)
        res.setHeader("Content-Type", "text/html; charset=utf-8")
        res.write(books_content)
        res.end()
    }
    else if(req.method === "GET" && url.pathname==='/book/' && url.searchParams)
    {
        if(url.searchParams.get("id")!==undefined)
        {
            const id:number = Number(url.searchParams.get("id"))
            const book : BookType|undefined= books.filter(book=>book.id===id)[0]
            console.log(book)
            if(book!==undefined)
            {
                res.setHeader("Content-Type", "text/html; charset=utf-8")
                res.write(showBook(book))    
            }
        }
        
        res.end()
    }

    else if(req.method==="POST" && req.url==="books")
    {
        res.write("Hello")
    }



    if(req.method==="GET" && path.extname(req.url as string)==='.css')
    {
        const PATH_TO_CSS = path.join("src","styles",req.url as string)
        const content = fs.readFileSync(PATH_TO_CSS)
        res.setHeader("Content-Type", "text/css; charset=utf-8")
        
        res.write(content)
    }
    if(req.method==="GET" && req.url==='/')
    {
        const PATH_TO_INDEX_PAGE = path.join(PATH_TO_PAGES,"index.html")
        const content = fs.readFileSync(PATH_TO_INDEX_PAGE)
        res.setHeader("Content-Type", "text/html; charset=utf-8")
        
        res.write(content)
    }
    else if(req.method==="GET" && req.url==='/about')
    {
        const PATH_TO_ABOUT_PAGE = path.join(PATH_TO_PAGES,"about.html")
        const content = fs.readFileSync(PATH_TO_ABOUT_PAGE)
        res.setHeader("Content-Type", "text/html; charset=utf-8")

        res.write(content)
    }
    // else if(req.method === "POST"){
    //     res.setHeader("Content-Type", "application/json; charset=utf-8")
    //     const user = {
    //         name:"Alex",
    //         age:20
    //     }
    //     res.write(JSON.stringify(user))
    // }
     else if(req.method === "PUT"){
        res.write(`Ти хочеш оновити дані. Request: ${req.method}`)
    }
    
    res.end()
})
server.listen(process.env.PORT,()=>{
    console.log(`Server ${process.env.HOST}:${process.env.PORT} has been started...`)
})