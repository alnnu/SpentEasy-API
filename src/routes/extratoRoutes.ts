import {Router} from "express";

import {updateExtrato} from "../validators/extratoValidator";

const router:Router = Router()

const extratoController = require("../controllers/ExtratoController")

const baseRoute:string = "/api/v1/extrato"

router.post(`${baseRoute}/create`, extratoController.create)

router.get(`${baseRoute}/:id`, extratoController.readOne)
router.get(`${baseRoute}/`, extratoController.readAll)

router.put(`${baseRoute}/:id`, updateExtrato, extratoController.update)

router.delete(`${baseRoute}/:id`, extratoController.deleteOne)

module.exports = router
