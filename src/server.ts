import express, { Request, Response } from "express"
import "dotenv/config"
import router from "./routes/bookRoutes.js"
import path from "node:path"
import ejs from "ejs"
import expressEjsLayouts from "express-ejs-layouts";
import { fileURLToPath } from "node:url";
import { loggerMiddleware } from "./middlewares/loggermiddleware.js"
import { authMiddleware } from "./middlewares/authMiddleware.js"
import cookieParser from "cookie-parser"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cl = console.log
const PORT = process.env.PORT || 3200
const HOST = process.env.HOST || "http://localhost"

const app = express()
app.use(cookieParser())
app.use(authMiddleware)
app.use(loggerMiddleware)
app.use(express.urlencoded({extended:true}))
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.set("layout", path.join(__dirname, "..", "views", "layout", "main"));



app.set("views", path.join(__dirname, "..", path.sep, "views"));
app.set("view engine", "ejs");


app.use(express.static("public"))
app.use(express.json()) //body -> json
app.get("/cookie", (req: Request, res: Response) => {
  res.cookie("username", "Bob", {maxAge:10000, httpOnly:true});
  res.cookie("email", "Bobayka@gmail.com");
  res.send("Cookie created");
});
app.get("/cookie-read", (req: Request, res: Response) => {
  if(req.cookies && req.cookies.username){
    res.send(`Welcome , ${req.cookies.username}`)
  }else{
    res.send('Welcome,quest')
  }
})

app.get("/cookie-remove", (req: Request, res: Response) => {
  if(req.cookies && req.cookies.username){
    res.clearCookie("username");
    res.send("Cookie removed");
  }else{
    res.send('Cookie not found')
  }
})



app.get('/', (req: Request<null, null, null, { title: string }>, res: Response) => {
    res.render("pages/home", { title: req.query.title })
})
app.use("/books", router);

app.listen(PORT, () => {
    cl(`Server has been started ${HOST}:${PORT}`)
})