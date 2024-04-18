import {Sequelize} from "sequelize";

const model  = require( "../models/UserModel");
const sequelize:Sequelize = require("./Sequelize")


    async function init():Promise<void> {
        await model.sync();
    }

    async function auth():Promise<void> {
        await sequelize.authenticate()
    }


module.exports = {
    init,
    auth,
}