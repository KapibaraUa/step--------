import { Router, Request, Response } from "express";
import { books } from "../data/books.js";
import { BookCreateType, BookType } from "../types/BookType.js";
import { getBooksByTitle } from "../utils/showBooks.js";
import { BookResponseType } from "../types/BookResponseType.js";
import path from 'node:path';
import { pool } from "../db/database.js";
import multer from "multer";
const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("public", "images"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
 
    cb(null, uniqueName);
  },
});
 
 const upload = multer({ storage });

router.get("/", async (req: Request, res: Response) => {
  // try {
  //   let our_books: BookType[] = [];
  //   const searchTitle = req.query.title ? String(req.query.title).trim() : "";

  //   if (searchTitle) {
  //     const result = await pool.query(
  //       "SELECT * FROM books1 WHERE title ILIKE $1 ORDER BY id ASC",
  //       [`%${searchTitle}%`]
  //     );
  //     our_books = result.rows;
  //   } else {
  //     const result = await pool.query("SELECT * FROM books1 ORDER BY id ASC");
  //     our_books = result.rows;
  //   }

  //   console.log("Загружено из БД:", our_books.map(b => ({ id: b.id, title: b.title, is_active: b.is_active, type: typeof b.is_active })));

  //   res.render("pages/books", {
  //     title: "Каталог детских книг",
  //     books: our_books,
  //   });
  // } catch (error) {
  //   console.error("Ошибка при получении книг из БД books1:", error);
  //   // Фолбэк на статический массив, если БД недоступна
  //   let our_books: BookType[] | null = null;
  //   if (req.query.title !== undefined) {
  //     our_books = getBooksByTitle(String(req.query.title), books);
  //   }
  //   res.render("pages/books", {
  //     title: "Каталог детских книг",
  //     books: our_books !== null ? our_books : books,
  //   });
  //}
  const data = await fetch(`${process.env.PATH_TO_JSON_SERVER}/books`)
  const json = await data.json();
  res.render("pages/books", {books: json, title:"Books"});
});

router.get(
  "/add-book",
  (req: Request, res: Response) => {
    res.render("pages/bookform", {title:"Add Book"})
  },
);

router.post(
  "/add-book",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const { title, price, is_active, publication_year } = req.body;

      // Ім'я збереженого файлу
      const image = req.file?.filename ?? null;
      const data = await fetch(`${process.env.PATH_TO_JSON_SERVER}/books`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, price, is_active, image, publication_year })
      });
      // const result = await pool.query( ...

      res.redirect("/books");
    } catch (error) {
      console.error(error);

      res.status(500).send("Помилка при додаванні книги");
    }
  }
);

router.get("/delete/:id", async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  try {
    await fetch(`${process.env.PATH_TO_JSON_SERVER}/books/${id}`, {
      method: "DELETE",
    });
    res.redirect("/books");
  } catch (error) {
    console.error(error);
    res.status(500).send("Помилка при видаленні книги");
  }
});

function compareBook(b1: BookType, b2: BookType): number {
  return b2.id - b1.id;
}



router.get("/:id", async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  try {
    const result = await pool.query("SELECT * FROM books1 WHERE id = $1", [id]);
    const book: BookType | undefined = result.rows[0];
    const exist_book: boolean = book !== undefined;
    const response: BookResponseType = {
      data: exist_book ? (book as BookType) : null,
      error: exist_book ? null : "The book not found",
      status: exist_book ? 200 : 404,
    };
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Ошибка при получении книги по id из БД:", error);
    const book: BookType | undefined = books.find((b) => b.id === id);
    const exist_book: boolean = book !== undefined;
    const response: BookResponseType = {
      data: exist_book ? (book as BookType) : null,
      error: exist_book ? null : "The book not found",
      status: exist_book ? 200 : 404,
    };
    res.status(response.status).json(response);
  }
});

router.post("/", (req: Request<{}, BookResponseType, BookCreateType>, res: Response) => {
  const body = req.body;
  const response: BookResponseType = {
    data: null,
    error: null,
    status: 500,
  };
  if (body !== undefined) {
    const id: number = books.length > 0 ? books.sort(compareBook)[0].id + 1 : 1;
    const book: BookType = {
      id,
      title: body.title,
      price: body.price,
      is_active: body.is_active,
    };
    books.push(book);
    response.data = book;
    response.status = 201;
  }
  res.status(response.status).json(response);
});

router.put("/:id", (req: Request<{ id: string }, BookResponseType, BookCreateType>, res: Response) => {
  const id: number = +req.params.id;
  const body = req.body;
  const index: number = books.findIndex((book) => book.id === id);
  const exist_book: boolean = index !== -1;
  const response: BookResponseType = {
    data: null,
    error: null,
    status: 500,
  };
  if (!exist_book) {
    response.error = "The book not found";
    response.status = 404;
  } else if (body === undefined) {
    response.error = "Body is empty";
    response.status = 400;
  } else {
    const book: BookType = {
      id,
      title: body.title,
      price: body.price,
      is_active: body.is_active,
    };
    books[index] = book;
    response.data = book;
    response.status = 200;
  }
  res.status(response.status).json(response);
});

router.delete("/:id", (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const index: number = books.findIndex((book) => book.id === id);
  const exist_book: boolean = index !== -1;
  const response: BookResponseType = {
    data: exist_book ? books.splice(index, 1)[0] : null,
    error: exist_book ? null : "The book not found",
    status: exist_book ? 200 : 404,
  };
  res.status(response.status).json(response);
});



export default router;
