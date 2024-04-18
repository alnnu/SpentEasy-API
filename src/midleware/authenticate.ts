import {Request, Response, NextFunction} from "express";

const jwt = require("../utils/jwt")


const authenticate = (req: Request, res: Response, next: NextFunction):void => {
    const token: string | undefined = req.headers["authorization"]

    const user: string = jwt.validToken(token)

    if(user == '')
        res.status(401)

    next()
}

module.exports = authenticate