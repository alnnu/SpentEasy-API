import express, {Express, Request, Response, Router} from "express"

import 'dotenv/config'

const userRouter: Router = require("./src/routes/userRoutes.ts")

const app: Express = express();

const db = require("./src/utils/db")

const port = process.env.PORT;


//init routers
app.use(userRouter)

app.get("/", (req: Request, res: Response)=> {
        res.send({
            "msg": "Hello world!!"
        })
})

//init db
db.auth()
db.init()
app.listen(port, (): void => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})

