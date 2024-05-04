import {Sequelize, DataTypes} from "sequelize"

import { randomUUID }  from 'node:crypto'

const db: Sequelize = require("../utils/Sequelize")


const User = require("./UserModel")

const PasswordToken = db.define("ResetPasswordToken",
    {
        Token: {
            primaryKey: true,
            type: DataTypes.STRING,
        },
        ExpireData: {
            type: DataTypes.DATE,
        }

    })

PasswordToken.addHook('beforeCreate', async (Token) => {
    Token.dataValues.ExpireData = new Date()

    console.log(Token.dataValues.ExpireData)

    Token.dataValues.ExpireData.setMinutes(new Date().getMinutes() + 60)
    Token.dataValues.Token = randomUUID()
})

PasswordToken.belongsTo(User)

module.exports = PasswordToken