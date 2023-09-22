const sequelize = require('../database/connect')
const Sequelize = require('sequelize')
const  successTable = sequelize.define('applied',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey: true 
    },
    nam:{
        type: Sequelize.STRING(80),
        allowNull:false,
      },
    ema:{
        type: Sequelize.STRING(80),
        allowNull:false,
      },
      phon:{
        type: Sequelize.STRING(80),
        allowNull:false,
      },
      amt:{
        type: Sequelize.STRING(80),
        allowNull:false,
      },
      bVn:{
        type: Sequelize.STRING(80),
        allowNull:false,
      },
      banks:{
        type: Sequelize.STRING(80),
        allowNull:false,
      },
      time:{
        type: Sequelize.STRING(80),
        allowNull:false,
      },
      accts:{
        type: Sequelize.STRING(80),
        allowNull:false,
      },
      term:{
        type: Sequelize.STRING(80),
        allowNull:false,
      }
})

module.exports = successTable