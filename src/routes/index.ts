import {Router} from "express";

const routes: Router = Router()
const userrRouter: Router = require("./userRoutes")
const authRoutes: Router = require("./authRoutes")
const transacaoRoutes: Router = require("./transacaoRoutes")
const accountRouter: Router = require("./accountsRoutes")
const categoryRouter: Router = require("./categoriesRouter")


const swagger: Router = require("./swaggerRoute")

const authenticate = require("../midleware/authenticate")

routes.use(swagger)

routes.use(authRoutes)
routes.use(authenticate, userrRouter)
routes.use(authenticate, transacaoRoutes)
routes.use(authenticate, accountRouter)
routes.use(authenticate, categoryRouter)


module.exports = routes