import {Request, Response, NextFunction} from "express";

const jwt = require("../utils/jwt")


const authenticate = (req: Request, res: Response, next: NextFunction):void => {
    const token: string | undefined = req.headers["authorization"]
    console.log(token)
    const user = jwt.validToken(token)
    console.log(user)
    if(user == null) {
        res.status(401).json({
            "msg": "Unauthorized"
        })
    }else {
        next()
    }



}

module.exports = authenticate