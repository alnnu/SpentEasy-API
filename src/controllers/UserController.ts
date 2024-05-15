import { Request, Response, NextFunction } from "express";
import {Model} from "sequelize";

const User = require("../models/UserModel")



const readOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try{
        const {email}= req.params

        const user: Model = await User.findByPk(email)


        if(user) {
            res.status(200).json(user)
        }else {
            res.status(404).json({
                "msg": "User not found"
            })
        }
    }catch (e) {
        next(e)
    }
}


const update = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {email} = req.params

        const {name, lastName} = req.body


        const user: Model | null = await User.findByPk(email)

        if(user) {
            user.set({
                name, lastName
            })

            await user.save()

            res.status(200).json(user)
        }else {
            res.status(404).json({
                "msg": "User not found"
            })
        }
    }catch (e) {
        next(e)
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction):Promise<void> => {

    try {
        const { email } = req.params

        const user: Model = await User.findByPk(email)

        if(user){
            await user.destroy()

            res.status(200).json({
                "msg": "User deleted"
            })
        }else {
            res.status(404).json({
                "msg": "User not found"
            })
        }
    }catch (e) {
        next(e)
    }
}

module.exports = {
    readOne,
    update,
    deleteOne
}