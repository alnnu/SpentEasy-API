import {DataTypes} from "sequelize";
import {randomUUID} from "node:crypto";

const Extrato = require("./ExtratoModel")
const db = require("../utils/Sequelize")

const TransacaoModel = db.define("trasacao",
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
            type: DataTypes.ENUM("cartao", "pix", "boleto", "dinhero", "outros"),
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,

        },
        tag: {
            type: DataTypes.ENUM("transporte", "alimentação", "diverção","outros"),
            allowNull: false
        },
        descrition: {
            type: DataTypes.STRING
        }
    })

TransacaoModel.addHook("beforeCreate", (transacao: any) => {
    transacao.dataValues.id = randomUUID()
})


module.exports = TransacaoModel