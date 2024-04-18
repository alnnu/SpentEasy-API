import {Sequelize} from "sequelize";

const model  = require( "../models/UserModel");
const sequelize:Sequelize = require("./Sequelize")


   const init = async ():Promise<void> => {
        await model.sync();
    }

    const auth= async ():Promise<void> => {
        await sequelize.authenticate()
    }


module.exports = {
    init,
    auth,
}