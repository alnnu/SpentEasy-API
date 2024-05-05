import {NextFunction, Request, Response} from "express"

import { valid } from "../validators/extratoValidator"


const jwt = require( "../utils/jwt")

const Extrato = require("../models/ExtratoModel")



const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token: string | undefined = req.headers["authorization"]
        const userEmail = jwt.validToken(token)


        const extrato = await Extrato.create({userEmail: userEmail.email})

        res.status(201).json(extrato)

    }catch (e) {
        next(e)
    }
}

const readOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {id} = req.params

        const extrato = await Extrato.findByPk(id)

        if(extrato) {
            res.status(200).json(extrato)
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
    try {
        const token: string | undefined = req.headers["authorization"]
        const userEmail = jwt.validToken(token)

        const extratos = await Extrato.findAll({
                where: {
                    userEmail: userEmail.email
                }
            })

        res.status(200).json(extratos)
    }catch (e) {
        next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = valid(req)

    if(errors.isEmpty()){
        try {
            const {id} = req.params

            let extrato = await Extrato.findByPk(id)

            if(extrato) {
                const {total} = req.body

                if(total) {
                    extrato.set({
                        total: total
                    })
                    extrato = await extrato.save()

                    res.status(200).json(extrato)
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

        const extrato = await Extrato.findByPk(id)

        if(extrato){
            await extrato.destroy()

            res.status(200).json({
                "msg": "extrato deleted"
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