import {NextFunction, Request, Response} from "express";

const categoriesModel = require("../models/CategoriesModel")

import {valid} from "../validators/categoriesValidator";
import {Model} from "sequelize";

const jwt = require("../utils/jwt")

const create = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    const error = valid(req)

    if (error.isEmpty()) {
        try {
            const {name} = req.body

            const token: string | undefined = req.headers["authorization"]
            const user = jwt.validToken(token)

            const category: Model = await categoriesModel.create({name: name, userEmail: user.email})

            res.status(201).json(category)
        } catch (e) {
            next(e)
        }
    }else {
        res.status(400).json(error)
    }
}

const readAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token: string | undefined = req.headers["authorization"]
        const user = jwt.validToken(token)

        const categories = await categoriesModel.findAll({
            where: {
                userEmail: user.email
            }
        })

        if (categories) {
            res.status(200).json(categories)
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



const deleteAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const error = valid(req)

    if (error.isEmpty()) {
        try {
            const {categories} = req.body
            let model

            for (const category of categories) {
                model = await categoriesModel.findByPk(category.id)
                if (model) {
                    await model.destroy()
                }
            }
            res.status(200).json({
                "msg": "category deleted"
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

            const model: Model = await categoriesModel.findByPk(id)
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
    create,
    readAll,
    deleteAll,
    uptade
}