import {NextFunction, Request, Response} from "express";
import {Model} from "sequelize";

const User = require("../models/UserModel")

const jwt = require("../utils/jwt")

const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {email, name, lastName, password} = req.body

        const user:Model =  await User.create({email,name,lastName,password})

        res.status(201).json(user)
    }catch (e) {
        next(e)
    }
}
const login = (req: Request, res: Response): void => {
    const token: string = jwt.createToken("luann")

    res.status(200).json(token)
}

module.exports = {
    create,
    login
}