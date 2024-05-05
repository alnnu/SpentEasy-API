import {DataTypes} from "sequelize";

const Extrato = require("./ExtratoModel")
const db = require("../utils/Sequelize")

const Transacao = db.define("trasacao",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        value: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        type: {
            type: DataTypes.ENUM("cartão", "pix", "boleto", "dinhero", "outros"),
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        tag: {
            type: DataTypes.ENUM("transporte", "alimentação", "diverção","outros"),
            allowNull: false
        },
        descrition: {
            type: DataTypes.STRING
        }
    })


module.exports = Transacao