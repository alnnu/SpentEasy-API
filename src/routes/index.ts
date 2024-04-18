import {Router} from "express";

const routes:Router = Router()
const UserModel:Router = require("./userRoutes")

routes.use(UserModel)


module.exports = routes