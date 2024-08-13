import {NextFunction, Request, Response} from "express";

const accountModel = require("../models/AccountModel")

import {valid} from "../validators/accountValidator";
import {promises} from "node:dns";
import {Model} from "sequelize";

const jwt = require("../utils/jwt")

const readAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token: string | undefined = req.headers["authorization"]
        const user = jwt.validToken(token)

        const account = await accountModel.findAll({
            where: {
                userEmail: user.email
            }
        })

        if (account) {
            res.status(200).json(account)
        } else {
            res.status(400).json({
                "errors": [
                    {
                        "type": "id",
                        "msg": "Record not found",
                        "location": "params"
                    }
                ]
            })
        }
    } catch (e) {
        next(e)
    }
}

const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const error = valid(req)

    if (error.isEmpty()) {
        try {
            const token: string | undefined = req.headers["authorization"]
            const user = jwt.validToken(token)

            const {name} = req.body

            const account = await accountModel.create({name: name, userEmail: user.email})

            res.status(201).json(account)
        } catch (e) {
            next(e)
        }
    } else {
        res.status(400).json(error)
    }
}


const deleteAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const error = valid(req)

    if (error.isEmpty()) {
        try {
            const {accounts} = req.body
            console.log(accounts)
            let model

            for (const account of accounts) {
                model = await accountModel.findByPk(account.id)
                if (model) {
                    await model.destroy()
                }
            }
            res.status(200).json({
                "msg": "account deleted"
            })
        } catch (e) {
            next(e)
        }
    } else {
        res.status(400).json(error)
    }
}

const uptade = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = valid(req)

    if (errors.isEmpty()) {
        try {
            const token: string | undefined = req.headers["authorization"]
            const user = jwt.validToken(token)

            const {id} = req.params

            const {name} = req.body

            const model: Model = await accountModel.findByPk(id)
            if (model && model.dataValues.userEmail == user.email) {
                model.set({name})
                await model.save()

                res.status(200).json(model)
            } else {
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
    } else {
        res.status(400).json(errors)
    }
}

module.exports = {
    readAll,
    create,
    deleteAll,
    uptade
}