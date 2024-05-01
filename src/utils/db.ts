import {Sequelize} from "sequelize";

const UserModel  = require( "../models/UserModel");
const ResetPasswordModel = require("../models/RestPasswordTokenModel")
const ValideteUserModel = require("../models/validateUserTokenModel")
const sequelize:Sequelize = require("./Sequelize")

const force = true
   const init = async ():Promise<void> => {
        await UserModel.sync({force: force})
        await ResetPasswordModel.sync({force: force})
        await ValideteUserModel.sync({force: force})
    }

    const auth= async ():Promise<void> => {
        await sequelize.authenticate()
    }


module.exports = {
    init,
    auth,
}