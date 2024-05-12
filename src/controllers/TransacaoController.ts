import {NextFunction, Request, Response} from "express";
import {Model} from "sequelize";
import {combineTableNames} from "sequelize/types/utils";

const jwt = require( "../utils/jwt")

const Transacao = require("../models/TransacaoModel")
const Extrato = require("../models/ExtratoModel")

const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {extratoId, value, date, tag, type} = req.body

        const extrato: Model = await Extrato.findByPk(extratoId)


        if(extrato) {
            const transacao: Model = await Transacao.create({extratoId, value, date, tag, type})
            extrato.set({
                total: extrato.dataValues.total + value
            })

            await extrato.save()

            res.status(201).json(transacao)
        }else {
            res.status(400).json({"errors": [
                    {
                        "type": "fild",
                        "msg": "Record of extrato not found",
                        "location": "body"
                    }
                ]})
        }

    }catch (e) {
        next(e)
    }
}


const readOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {id} = req.params

        const trasacao:Model = await Transacao.findByPk(id)

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
    try {

        const trasacao = await Transacao.findAll()

        res.status(200).json(trasacao)
    }catch (e) {
        next(e)
    }
}

const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const {id} = req.params

        let trasacao = await Transacao.findByPk(id)

        if(trasacao) {
            const {value, type, date, tag, descrition} = req.body

            const extrato = await Extrato.findByPk(trasacao.dataValues.extratoId)

            extrato.set({
                total: (extrato.dataValues.total - trasacao.dataValues.value) + value
            })

            await extrato.save()

            trasacao.set({value, type, date, tag, descrition})
            trasacao = await trasacao.save()

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

const deleteOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {id} = req.params

        const trasacao = await Transacao.findByPk(id)

        if(trasacao){

            const extrato = await Extrato.findByPk(trasacao.dataValues.extratoId)

            extrato.set({
                total: extrato.dataValues.total - trasacao.dataValues.value
            })

            await extrato.save()

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