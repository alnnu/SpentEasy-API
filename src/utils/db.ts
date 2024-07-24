import {Sequelize} from "sequelize";

const UserModel  = require( "../models/UserModel");
const ResetPasswordModel = require("../models/RestPasswordTokenModel")
const TransacaoModel = require("../models/TransacaoModel")
const ExtratoModel = require("../models/ExtratoModel")
const AccountModel = require("../models/AccountModel")
const sequelize:Sequelize = require("./Sequelize")

const force = false
   const init = async ():Promise<void> => {
        await UserModel.sync({force: force})
        await ResetPasswordModel.sync({force: force})
        await ExtratoModel.sync({force: force})
        await  TransacaoModel.sync({force: force})
        await  AccountModel.sync({force: force})
    }

    const auth= async ():Promise<void> => {
        await sequelize.authenticate()
    }


module.exports = {
    init,
    auth,
}