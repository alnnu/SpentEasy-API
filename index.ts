import express, {Express, Request, Response, Router} from "express"

import 'dotenv/config'

const router: Router = require("./src/routes/index.ts")

const app: Express = express();

const db = require("./src/utils/db")

const port = process.env.PORT;

//init router
app.use(router)

app.get("/", (req: Request, res: Response)=> {
        res.send({
            "msg": "Hello world!!"
        })
})

//init db
try {
    db.auth()
    db.init()
    console.log("[sever]: Db iniciado")
}catch (e) {
    console.error("[ever error]: Erro ao iniciar o DB")
}

app.listen(port, (): void => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})

