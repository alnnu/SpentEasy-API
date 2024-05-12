import {Router} from "express";

import {updateExtrato} from "../validators/extratoValidator";

const router:Router = Router()

const transacaoController = require("../controllers/TransacaoController")

const baseRoute:string = "/api/v1/transacao"

router.post(`${baseRoute}/create`, transacaoController.create)

router.get(`${baseRoute}/:id`, transacaoController.readOne)
router.get(`${baseRoute}/`, transacaoController.readAll)

router.put(`${baseRoute}/:id`, transacaoController.update)

router.delete(`${baseRoute}/:id`, transacaoController.deleteOne)

module.exports = router
