import express, { Request, Response } from "express"
import "dotenv/config"
import router from "./routes/bookRoutes.js"
import path from "node:path"
import ejs from "ejs"
import expressEjsLayouts from "express-ejs-layouts";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cl = console.log
const PORT = process.env.PORT || 3200
const HOST = process.env.HOST || "http://localhost"

const app = express()

app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.set("layout", path.join(__dirname, "..", "views", "layout", "main"));



app.set("views", path.join(__dirname, "..", path.sep, "views"));
app.set("view engine", "ejs");


app.use(express.static("public"))
app.use(express.json()) //body -> json
app.get('/', (req: Request<null, null, null, { title: string }>, res: Response) => {
    res.render("pages/home", { title: req.query.title })
})
app.use("/books", router);

app.listen(PORT, () => {
    cl(`Server has been started ${HOST}:${PORT}`)
})