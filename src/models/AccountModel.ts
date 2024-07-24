import {DataTypes} from "sequelize"
import {randomUUID} from "node:crypto";

const db = require("../utils/Sequelize")

const User = require("./UserModel")

const AccountModel = db.define("accounts", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

AccountModel.addHook("beforeCreate", (account: any) => {
    account.dataValues.id = randomUUID()
})

AccountModel.belongsTo(User)

module.exports = AccountModel