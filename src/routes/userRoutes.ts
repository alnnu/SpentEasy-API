import {Router, Request, Response} from "express";


const routes : Router = Router()

const BaseRoute : String = "/api/v1"

routes.get(`${BaseRoute}/user`, (req: Request, res: Response): void => {
    res.send({
        "msg": "Hello user!!"
    })
})

routes.get(`${BaseRoute}/user/{id}`, (req: Request, res: Response): void => {
    res.send({
        "msg": "Hello user!!"
    })
})

routes.post(`${BaseRoute}/user`, (req: Request, res: Response): void => {
    res.send({
        "msg": "Hello user!!"
    })
})

routes.delete(`${BaseRoute}/user/{id}`, (req: Request, res: Response): void => {
    res.send({
        "msg": "Hello user!!"
    })
})

routes.put(`${BaseRoute}/user/{id}`, (req: Request, res: Response): void => {
    res.send({
        "msg": "Hello user!!"
    })
})


module.exports = routes