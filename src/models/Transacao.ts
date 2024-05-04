import {DataTypes} from "sequelize";

const Extrato = require("./ExtratoModel")
const db = require("sequelize")

const Transacao = db.define("trasacao",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        value: {
            type: DataTypes.NUMBER,
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
            type: DataTypes.ENUM("transporte", "alimentação", "diverção","outros")
        }
    })

Transacao.belongsTo(Extrato)

module.exports = Transacao