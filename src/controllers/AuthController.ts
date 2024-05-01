import {NextFunction, raw, Request, Response} from "express";
import {Model} from "sequelize";

import { valid } from "../validators/authValidator"

const User = require("../models/UserModel")

const ResetPasswordToken = require("../models/RestPasswordTokenModel")

const ValidateUserToken = require("../models/validateUserTokenModel")

const jwt = require("../utils/jwt")

const bcrypt = require("bcrypt")
const saltRounds = 10

const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const erros = valid(req)

        if(erros.isEmpty()) {
            let {email, name, lastName, password, passwordConfirm} = req.body

            if(!await User.findByPk(email)) {
                password = await bcrypt
                    .genSalt(saltRounds)
                    .then((salt: any) => {
                        return bcrypt.hash(password, salt)
                    })
                    .catch((err: any) => console.error(err.message))


                if (await bcrypt.compare(passwordConfirm, password)) {
                    const user:Model =  await User.create({email,name,lastName,password})

                    await ValidateUserToken.create({userEmail: user.dataValues.email})

                    res.status(201).json(user)
                }else {
                    res.status(400).json({"errors": [
                            {
                                "type": "field",
                                "msg": "password and password confirm need do equal",
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
            res.status(400).json(erros)
        }

    }catch (e) {
        next(e)
    }
}

const createResetPasswordToken = async (req  : Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const erros = valid(req)

        if(erros.isEmpty()) {
            const { email } = req.body

            const user = await User.findByPk(email)


            if(user) {

                let token = await ResetPasswordToken.findOne({ where: { userEmail: user.email } })

                if(token) {
                    await token.destroy()
                }

                token = await ResetPasswordToken.create({
                    userEmail: user.email
                })

                res.status(201).json(token)
            }else {
                res.status(400).json({"errors": [
                        {
                            "type": "field",
                            "msg": "Email not found",
                            "location": "body"
                        }
                    ]})
            }
        }else {
            res.status(400).json(erros)
        }



    }catch (e) {
        next(e)
    }
}

const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const erros = valid(req)


        if(erros.isEmpty()) {

            let { password, passwordConfirm } = req.body

            const { token } = req.params

            const resetToken = await ResetPasswordToken.findByPk(token)


            if(resetToken) {
                if(resetToken.ExpireData - resetToken.createdAt > 0) {
                    const user = await User.findByPk(resetToken.userEmail)
                    password = await bcrypt
                        .genSalt(saltRounds)
                        .then((salt: any) => {
                            return bcrypt.hash(password, salt)
                        })
                        .catch((err: any) => console.error(err.message))

                    if(await bcrypt.compare(passwordConfirm, password)) {
                        user.set({
                            password: password
                        })

                        await user.save()

                        await resetToken.destroy()

                        res.status(200).json({
                            "msg": "User password updated"
                        })
                    }
                }else {
                    await resetToken.destroy()
                    res.status(400).json({"errors": [
                            {
                                "type": "token",
                                "msg": "Token expired",
                                "location": "params"
                            }
                        ]})
                }
            }else {
                res.status(400).json({"errors": [
                        {
                            "type": "token",
                            "msg": "Token not found",
                            "location": "params"
                        }
                    ]})
            }
        }else {
            res.status(400).json(erros)
        }


    }catch (e) {
        next(e)
    }
}

const validUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { token }= req.params

        const validateToken = await ValidateUserToken.findByPk(token)


        if(validateToken) {
            console.log(validateToken.ExpireData)
            console.log(validateToken.dataValues.ExpireData)

            if(validateToken.ExpireData - validateToken.createdAt > 0) {
                const user = await User.findByPk(validateToken.userEmail)


                user.set({
                    isValid: true
                })

                await user.save()

                await validateToken.destroy()

                res.status(200).json({
                    "msg": "User was validated"
                })
            }else {
                await validateToken.destroy()
                res.status(400).json({"errors": [
                        {
                            "type": "token",
                            "msg": "Token expired",
                            "location": "params"
                        }
                    ]})
            }
        }else {
            res.status(400).json({"errors": [
                    {
                        "type": "token",
                        "msg": "Token not found",
                        "location": "params"
                    }
                ]})
        }
    }catch (e) {
        next(e)
    }
}
const login = async (req: Request, res: Response): Promise<void> => {

    const erros = valid(req)

    if (erros.isEmpty()) {

        const { email, password } = req.body

        const user: Model = await User.findByPk(email)

        if (user && user.dataValues.isValid == true) {
            if (await bcrypt.compare(password, user.dataValues.password)) {
                const token: string = jwt.createToken(email)
                res.status(200).json({
                    token: token
                })
            }else {
                res.status(400).json({"errors": [
                        {
                            "type": "auth",
                            "msg": "Email or password incorrect",
                            "location": "body"
                        }
                    ]})
            }
        }else {
            res.status(400).json({"errors": [
                    {
                        "type": "auth",
                        "msg": "Email or password incorrect",
                        "location": "body"
                    }
                ]})
        }


    }else {
        res.status(400).json(erros)
    }
}

module.exports = {
    create,
    createResetPasswordToken,
    resetPassword,
    validUser,
    login
}