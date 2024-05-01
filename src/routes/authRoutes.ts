import {Router} from "express";

import { createUser, loginUser, createResetPasswordToken, resetPassword} from "../validators/authValidator";
import {toUnicode} from "punycode";



const routes : Router = Router()

const authController = require("../controllers/AuthController")

const BaseRoute : String = "/api/v1/auth"

routes.get(`${BaseRoute}/login`, loginUser, authController.login)

routes.post(`${BaseRoute}/create`, createUser, authController.create)

routes.post(`${BaseRoute}/create/passwordtoken`, createResetPasswordToken, authController.createResetPasswordToken)

routes.put(`${BaseRoute}/resetpassword/:token`, resetPassword, authController.resetPassword)

routes.put(`${BaseRoute}/validuser/:token`, authController.validUser)

module.exports = routes