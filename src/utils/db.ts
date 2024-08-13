import {Sequelize} from "sequelize";

const UserModel = require("../models/UserModel");
const ResetPasswordModel = require("../models/RestPasswordTokenModel")
const TransacaoModel = require("../models/TransacaoModel")
const AccountModel = require("../models/AccountModel")
const categoryModel = require("../models/CategoriesModel")
const sequelize: Sequelize = require("./Sequelize")

const force = false
const init = async (): Promise<void> => {
    await UserModel.sync({force: force})
    await ResetPasswordModel.sync({force: force})
    await AccountModel.sync({force: force})
    await categoryModel.sync({force: force})
    await TransacaoModel.sync({force: force})
}

const auth = async (): Promise<void> => {
    await sequelize.authenticate()
}


module.exports = {
    init,
    auth,
}