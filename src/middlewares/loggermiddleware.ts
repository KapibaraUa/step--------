import {Request, Response, NextFunction} from "express"

import path from "node:path"
import FileWorker from "../utils/FileWorker.js"

export const loggerMiddleware = async (req:Request,res:Response,next:NextFunction)=>{
    console.log("Run middleware logger")
    FileWorker.path = path.join("..","..","logs","logs.txt")
    if(req.params) {
        const params = JSON.stringify(req.params)
        await FileWorker.readFile(params)
    }
    res.locals.is_auth = true
    if(req.body) {
        const body = JSON.stringify(req.body)
        await FileWorker.readFile(body)
    }
    //res.end()
    next() //Обов'язково
}
