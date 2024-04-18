import {Router, Request, Response} from "express";


const routes : Router = Router()

const BaseRoute : String = "/api/v1"

routes.get(`${BaseRoute}/user`, (req: Request, res: Response): void => {
    res.send({
        "msg": "Hello user!!"
    })
})

module.exports = routes