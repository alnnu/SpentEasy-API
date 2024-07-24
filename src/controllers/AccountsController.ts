import {NextFunction, Request, Response} from "express";

const accountModel = require("../models/AccountModel")

const jwt = require("../utils/jwt")

const readAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token: string | undefined = req.headers["authorization"]
        const user = jwt.validToken(token)

        const account = await accountModel.findAll({where: {
                userEmail: user.email
            }})

        if(account) {
            res.status(200).json(account)
        }else {
            res.status(400).json({"errors": [
                    {
                        "type": "id",
                        "msg": "Record not found",
                        "location": "params"
                    }
                ]})
        }
    } catch (e) {
        next(e)
    }
}

const create = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
    try {
        const token: string | undefined = req.headers["authorization"]
        const user = jwt.validToken(token)

        const {name} = req.body

        const account = await accountModel.create({ name:name, userEmail: user.email})

        res.status(201).json(account)
    }catch (e) {
        next(e)
    }
}

module.exports = {
    readAll,
    create
}