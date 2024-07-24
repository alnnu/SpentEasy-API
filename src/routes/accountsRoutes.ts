import {Router} from "express";

const accountController = require("../controllers/AccountsController")


const routes: Router = Router()


routes.get("/api/v1/account/", accountController.readAll)
routes.post("/api/v1/account/create", accountController.create)

module.exports = routes