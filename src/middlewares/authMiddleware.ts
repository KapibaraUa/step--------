import {Request, Response, NextFunction} from "express"

const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    if(req.cookies && req.cookies.username)
    {
        res.locals.username = req.cookies.username;
    }
    else
    {
        res.locals.username = "guest";
    }
    next();
}

export { authMiddleware };
