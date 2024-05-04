import {DataTypes, Sequelize} from "sequelize"
import {randomUUID} from "node:crypto"

const db: Sequelize = require("../utils/Sequelize")

const User = require("./UserModel")

const ValidateUserTokenModel = db.define("ValidateUserToken",
    {
        token: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        ExpireData: {
            type: DataTypes.DATE,
        }
    })

ValidateUserTokenModel.addHook("beforeCreate", (token) => {
    token.dataValues.ExpireData = new Date()


    token.dataValues.ExpireData.setMinutes(new Date().getMinutes() + 30)
    token.dataValues.token = randomUUID()
    console.log(token)
})

ValidateUserTokenModel.belongsTo(User)

module.exports = ValidateUserTokenModel