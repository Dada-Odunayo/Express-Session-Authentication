
const {Sequelize} = require('sequelize');
const mysql = require("mysql2");

const sequelize = new Sequelize({
    database:'auth',
    username:'root',
    password:'',
    host:'localhost',
    dialect:'mysql',
    dialectModule: mysql
})



module.exports = sequelize;