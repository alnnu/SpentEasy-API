import {Request, Response, NextFunction} from "express";

const jwt = require("../utils/jwt")

const User = require("../models/UserModel")

const authenticate = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    const token: string | undefined = req.headers["authorization"]
    const userEmail = jwt.validToken(token)

    try {
        if(userEmail == null) {
            res.status(401).json({
                "msg": "Unauthorized"
            })
        }else {
            const user = await User.findByPk(userEmail.email)

            if (user) {
                next()
            } else {
                res.status(401).json({
                    "msg": "Unauthorized"
                })
            }
        }
    }catch (e) {
        console.error(e)
        res.status(401).json({
            "msg": "Unauthorized"
        })
    }


}

module.exports = authenticate