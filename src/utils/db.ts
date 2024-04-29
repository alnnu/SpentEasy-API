import {Sequelize} from "sequelize";

const UserModel  = require( "../models/UserModel");
const ResetPasswordModel = require("../models/RestPasswordToken")
const sequelize:Sequelize = require("./Sequelize")


   const init = async ():Promise<void> => {
        await UserModel.sync()
        await ResetPasswordModel.sync()
    }

    const auth= async ():Promise<void> => {
        await sequelize.authenticate()
    }


module.exports = {
    init,
    auth,
}