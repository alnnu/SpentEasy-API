import {Router} from "express";

const routes:Router = Router()
const userrRouter:Router = require("./userRoutes")
const authRoutes:Router = require("./authRoutes")
const extratoRoutes:Router = require("./extratoRoutes")
const transacaoRoutes:Router = require("./transacaoRoutes")
const accountRouter:Router = require("./accountsRoutes")


const swagger:Router = require("./swaggerRoute")

const authenticate = require("../midleware/authenticate")

routes.use(swagger)

routes.use(authRoutes)
routes.use(authenticate,userrRouter)
routes.use(authenticate,extratoRoutes)
routes.use(authenticate,transacaoRoutes)
routes.use(authenticate,accountRouter)


module.exports = routes