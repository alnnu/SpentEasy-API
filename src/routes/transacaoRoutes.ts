import {Router} from "express";

import {createTransacao, uptadeTransacao} from "../validators/transacaoValidator";

const router:Router = Router()

const transacaoController = require("../controllers/TransacaoController")

const baseRoute:string = "/api/v1/transacao"

router.post(`${baseRoute}/create`, createTransacao, transacaoController.create)

router.get(`${baseRoute}/:id`, transacaoController.readOne)
router.get(`${baseRoute}/`, transacaoController.readAll)

router.put(`${baseRoute}/:id`, uptadeTransacao, transacaoController.update)

router.delete(`${baseRoute}/delete`, transacaoController.deleteAll)

module.exports = router
