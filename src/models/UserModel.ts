import {Sequelize, DataTypes} from "sequelize";

const db: Sequelize = require("../utils/Sequelize")


const User = db.define('user',
    {
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isValid: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })


module.exports = User