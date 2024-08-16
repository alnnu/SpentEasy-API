import {DataTypes} from "sequelize"
import {randomUUID} from "node:crypto";

const db = require("../utils/Sequelize")

const User = require("./UserModel")


const CateoryModel = db.define("categories", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

CateoryModel.addHook("beforeCreate", (account: any) => {
    account.dataValues.id = randomUUID()
})

CateoryModel.belongsTo(User)




module.exports = CateoryModel