import {NextFunction, Request, Response} from "express";
import {Model} from "sequelize";

import { valid } from "../validators/userValidator"

const User = require("../models/UserModel")

const jwt = require("../utils/jwt")

const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const errors = valid(req)

        if(errors.isEmpty()) {
            const {email, name, lastName, password, passwordConfirm} = req.body

            const user:Model =  await User.create({email,name,lastName,password, passwordConfirm})

            res.status(201).json(user)
        }else {
            res.status(400).json(errors)
        }

    }catch (e) {
        next(e)
    }
}
const login = (req: Request, res: Response): void => {

    const erros = valid(req)

    if (erros.isEmpty()) {
        const token: string = jwt.createToken("luann")
        res.status(200).json(token)
    }else {
        res.status(400).json(erros)
    }
}

module.exports = {
    create,
    login
}