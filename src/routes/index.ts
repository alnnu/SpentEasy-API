import {Router} from "express";

const routes:Router = Router()
const userrRouter:Router = require("./userRoutes")
const authRoutes:Router = require("./authRoutes")
const extratoRoutes:Router = require("./extratoRoutes")

const authenticate = require("../midleware/authenticate")

routes.use(authRoutes)
routes.use(authenticate,userrRouter)
routes.use(authenticate,extratoRoutes)


module.exports = routes