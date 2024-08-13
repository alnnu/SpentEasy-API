import {DataTypes} from "sequelize";
import {randomUUID} from "node:crypto";

const db = require("../utils/Sequelize")

const categoryModel = require("./CategoriesModel")
const accountModel = require("./AccountModel")


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
        date: {
            type: DataTypes.DATE,

        },
        description: {
            type: DataTypes.STRING
        }
    })

TransacaoModel.addHook("beforeCreate", (transacao: any) => {
    transacao.dataValues.id = randomUUID()
})

TransacaoModel.belongsTo(accountModel)
TransacaoModel.belongsTo(categoryModel)


module.exports = TransacaoModel