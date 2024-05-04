import {Router} from "express";

const routes:Router = Router()
const UserModel:Router = require("./userRoutes")
const authRoutes:Router = require("./authRoutes")

const authenticate = require("../midleware/authenticate")

routes.use(authRoutes)
routes.use(authenticate,UserModel)


module.exports = routes