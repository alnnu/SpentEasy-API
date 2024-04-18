import express, {Express, Request, Response, Router} from "express"
import 'dotenv/config'

const userRouter: Router = require("./src/routes/userRoutes.ts")

const app: Express = express();


const port = process.env.PORT;

app.use(userRouter)

app.get("/", (req: Request, res: Response): void => {
        res.send({
            "msg": "Hello world!!"
        })
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})

