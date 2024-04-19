import {Router} from "express";

import { createUser, loginUser } from "../validators/userValidator";



const routes : Router = Router()

const authController = require("../controllers/AuthController")

const BaseRoute : String = "/api/v1/auth"

routes.get(`${BaseRoute}/login`, loginUser, authController.login)

routes.post(`${BaseRoute}/create`, createUser, authController.create)

module.exports = routes