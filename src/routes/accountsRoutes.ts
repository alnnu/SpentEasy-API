import {Router} from "express";

const accountController = require("../controllers/AccountsController")


const routes: Router = Router()


routes.get("/api/v1/account/", accountController.readAll)
routes.post("/api/v1/account/create", accountController.create)
routes.delete("/api/v1/account/delete", accountController.deleteAll)

module.exports = routes