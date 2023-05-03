const sequelize = require('../database/connect')
const Sequelize = require('sequelize')

const userTable = sequelize.define('loan',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey: true 
    },
    loanAmount:{
        type: Sequelize.STRING(80),
        allowNull:false,
      },
      loanTerm:{
        type: Sequelize.STRING(80),
        allowNull:false,
      },
      duration:{
        type: Sequelize.STRING(80),
        allowNull:false,
      },
      intrest:{
        type: Sequelize.STRING(80),
        allowNull:false,
      }

})
module.exports =userTable
