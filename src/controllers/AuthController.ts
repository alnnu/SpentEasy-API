import {NextFunction, Request, Response} from "express";
import {Model} from "sequelize";

import { valid } from "../validators/userValidator"

const User = require("../models/UserModel")

const ResetPasswordToken = require("../models/RestPasswordToken")

const jwt = require("../utils/jwt")

const bcrypt = require("bcrypt")
const saltRounds = 10

const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const errors = valid(req)

        if(errors.isEmpty()) {
            let {email, name, lastName, password, passwordConfirn} = req.body

            if(!await User.findByPk(email)) {
                password = await bcrypt
                    .genSalt(saltRounds)
                    .then((salt: any) => {
                        return bcrypt.hash(password, salt)
                    })
                    .catch((err: any) => console.error(err.message))


                if (await bcrypt.compare(passwordConfirn, password)) {
                    const user:Model =  await User.create({email,name,lastName,password})

                    res.status(201).json(user)
                }else {
                    res.status(400).json({"errors": [
                            {
                                "type": "field",
                                "msg": "password and password confirn need do equal",
                                "location": "body"
                            }
                        ]})
                }
            }else {
                res.status(400).json({"errors": [
                        {
                            "type": "field",
                            "msg": "Email in use",
                            "location": "body"
                        }
                    ]})
            }

        }else {
            res.status(400).json(errors)
        }

    }catch (e) {
        next(e)
    }
}

// const CreateResetPassword = async (req  : Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         cost user
//
//     }catch (e) {
//         next(e)
//     }
// }
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