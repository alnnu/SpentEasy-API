import {DataTypes} from "sequelize";

const User = require("./UserModel")

const db = require("sequelize")

const Extrato = db.define("extrato",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        openingDate: {
            type: DataTypes.DATE,
            allowNull: false,
            default: new Date()
        },
        closeDate: {
            type: DataTypes.DATE,
            allowNull: false,
            default: new Date().setMonth(new Date().getMonth() + 1)
        },
        total: {
            type: DataTypes.NUMBER,
            default: 0
        }
    })

Extrato.belongsTo(User)

module.exports = Extrato