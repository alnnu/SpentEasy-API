import {Router} from "express";

import { createUser, loginUser } from "../validators/userValidator";
import {toUnicode} from "punycode";



const routes : Router = Router()

const authController = require("../controllers/AuthController")

const BaseRoute : String = "/api/v1/auth"

routes.get(`${BaseRoute}/login`, loginUser, authController.login)

routes.post(`${BaseRoute}/create`, createUser, authController.create)

routes.post(`${BaseRoute}/create/passwordtoken`, authController.createResetPasswordToken)

routes.post(`${BaseRoute}/resetpassword/:token`, authController.resetPassword)

module.exports = routes