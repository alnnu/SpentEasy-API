import {Router} from "express";
import {createAccount, deleteAccount, editAccount} from "../validators/accountValidator";

const accountController = require("../controllers/AccountsController")


const routes: Router = Router()


routes.get("/api/v1/account/", accountController.readAll)
routes.post("/api/v1/account/create", createAccount, accountController.create)
routes.delete("/api/v1/account/delete", deleteAccount, accountController.deleteAll)
routes.put("/api/v1/account/:id", editAccount, accountController.uptade)

module.exports = routes