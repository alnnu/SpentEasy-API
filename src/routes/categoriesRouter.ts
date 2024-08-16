import {Router} from "express";
import {createCategory, deleteCategory, editCategory} from "../validators/categoriesValidator";

const accountController = require("../controllers/CategoriesController")


const routes: Router = Router()


routes.get("/api/v1/category/", accountController.readAll)
routes.post("/api/v1/category/create", createCategory, accountController.create)
routes.delete("/api/v1/category/delete", deleteCategory, accountController.deleteAll)
routes.put("/api/v1/category/:id", editCategory, accountController.uptade)

module.exports = routes