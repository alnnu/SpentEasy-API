import {Router} from "express";


const routes : Router = Router()

const userController = require("../controllers/UserController")

const BaseRoute : String = "/api/v1"

routes.get(`${BaseRoute}/user/:email`, userController.readOne)

routes.delete(`${BaseRoute}/user/:email`, userController.deleteOne)

routes.put(`${BaseRoute}/user/:email`,userController.update)


module.exports = routes