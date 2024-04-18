import {Sequelize} from "sequelize"

import "dotenv/config"

const banco: string = process.env.POSTGRES_DB || "";
const user: string = process.env.POSTGRES_USER || "";
const senha: string = process.env.POSTGRES_PASSWORD || "";

const sequelize: Sequelize = new Sequelize(banco, user, senha, {
    host: 'db',
    dialect: "postgres"
})



module.exports = sequelize