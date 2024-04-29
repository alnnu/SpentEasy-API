import {Sequelize, DataTypes, CreateOptions} from "sequelize";

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
            allowNull: false,
        }

    })

// PasswordToken.addHook('beforeCreate', (Token, options) => {
//     Token.ExpireData = new Date().getTime() + 60
// })

PasswordToken.belongsTo(User)

module.exports = PasswordToken