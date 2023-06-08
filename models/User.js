const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define('User',{
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull:false
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    }
})

module.exports = User;