import {Router} from "express";


const routes : Router = Router()

const authController = require("../controllers/AuthController")

const BaseRoute : String = "/api/v1/auth"

routes.get(`${BaseRoute}/login`, authController.login)

routes.post(`${BaseRoute}/create`, authController.create)

module.exports = routes