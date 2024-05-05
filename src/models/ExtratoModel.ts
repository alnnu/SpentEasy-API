import {DataTypes, UUID} from "sequelize";
import {randomUUID} from "node:crypto";
import {before} from "node:test";


const User = require("./UserModel")

const db = require("../utils/Sequelize")

const Extrato = db.define("extrato",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        openingDate: {
            type: DataTypes.DATE,
        },
        closeDate: {
            type: DataTypes.DATE,
        },
        total: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    })

Extrato.addHook("beforeCreate", (extrato:any) => {
    const date: Date = new Date()
    extrato.dataValues.id = randomUUID()
    extrato.dataValues.openingDate = date
    extrato.dataValues.closeDate = new Date().setMonth(date.getMonth() + 1)
})

Extrato.belongsTo(User)

module.exports = Extrato