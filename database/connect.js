const Sequelize = require('sequelize')

const connect = new Sequelize("loan_app", "root", "ayomidemysql", {
    host: "localhost",
    dialect: "mysql"
})
module.exports = connect