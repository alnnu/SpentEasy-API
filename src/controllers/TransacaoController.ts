import {NextFunction, Request, Response} from "express"
import {Model} from "sequelize"

import {valid} from "../validators/transacaoValidator"

const jwt = require( "../utils/jwt")


const Transacao = require("../models/TransacaoModel")
const Account = require("../models/AccountModel")
const Category = require("../models/CategoriesModel")

const Jwt = require("../utils/jwt")
const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const errors = valid(req)

    if(errors.isEmpty()) {
        try {
            let {accountId, categoryId, value, date, description} = req.body


            const token: string | undefined = req.headers["authorization"]
            const user = jwt.validToken(token)

            const account: Model = await Account.findByPk(accountId)
            const category: Model = await Category.findByPk(categoryId)


            value = value*100

            if(account && account.dataValues.userEmail == user.email) {
                if(category && category.dataValues.userEmail == user.email) {
                    const transacao: Model = await Transacao.create({accountId, categoryId, value, date, description})

                    res.status(201).json(transacao)
                }else {
                    res.status(400).json({"errors": [
                            {
                                "type": "fild",
                                "msg": "Record of category not found",
                                "location": "body"
                            }
                        ]})
                }
            }else {
                res.status(400).json({"errors": [
                        {
                            "type": "fild",
                            "msg": "Record of account not found",
                            "location": "body"
                        }
                    ]})
            }

        }catch (e) {
            next(e)
        }
    }else {
        res.status(400).json(errors)
    }

}


const readOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const token: string | undefined = req.headers["authorization"]
    const user = jwt.validToken(token)

    try {
        const {id} = req.params

        const trasacao:Model = await Transacao.findByPk(id, {
            include: ['account'],
            where: {
                '$account.userEmail$': user.email
            }
        })

        if(trasacao) {
            res.status(200).json(trasacao)
        }else {
            res.status(400).json({"errors": [
                    {
                        "type": "id",
                        "msg": "Record not found",
                        "location": "params"
                    }
                ]})
        }
    }catch (e) {
        next(e)
    }
}

const readAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const token: string | undefined = req.headers["authorization"]
    const user = jwt.validToken(token)

    try {

        const trasacao = await Transacao.findAll({
            include: ['account', 'category'],
            where: {
                '$account.userEmail$': user.email
            }
        })

        res.status(200).json(trasacao)
    }catch (e) {
        next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const errors = valid(req)
    if(errors.isEmpty()) {
        try {
            const {id} = req.params

            let trasacao = await Transacao.findByPk(id)

            if(trasacao) {
                let {value, date, description, accountId, categoryId} = req.body

                const token: string | undefined = req.headers["authorization"]
                const user = jwt.validToken(token)

                const account: Model = await Account.findByPk(accountId)
                const category: Model = await Category.findByPk(categoryId)


                if(account && account.dataValues.userEmail == user.email) {
                    if(category && category.dataValues.userEmail == user.email) {
                        value = value*100



                        trasacao.set({value, date, description, accountId, categoryId })
                        trasacao = await trasacao.save()

                        res.status(200).json(trasacao)
                    }else {
                        res.status(400).json({"errors": [
                                {
                                    "type": "fild",
                                    "msg": "Record of category not found",
                                    "location": "body"
                                }
                            ]})
                    }
                }else {
                    res.status(400).json({"errors": [
                            {
                                "type": "fild",
                                "msg": "Record of account not found",
                                "location": "body"
                            }
                        ]})
                }


            }else {
                res.status(400).json({"errors": [
                        {
                            "type": "id",
                            "msg": "Record not found",
                            "location": "params"
                        }
                    ]})
            }
        }catch (e) {
            next(e)
        }
    }else {
        res.status(400).json(errors)
    }

}

const deleteOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const {id} = req.params

        const trasacao = await Transacao.findByPk(id)

        if(trasacao){

            await trasacao.destroy()

            res.status(200).json({
                "msg": "trasacao deleted"
            })
        }else {
            res.status(404).json({"errors": [
                    {
                        "type": "id",
                        "msg": "Record not found",
                        "location": "params"
                    }
                ]})
        }
    }catch (e) {
        next(e)
    }
}

module.exports = {
    create,
    readOne,
    readAll,
    update,
    deleteOne
}