const sequelize = require('../database/connect')
const Sequelize = require('sequelize')

const userTable = sequelize.define('user',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey: true 
    },
    name:{
        type: Sequelize.STRING(80),
        allowNull:false,
      },
    email:{
    type: Sequelize.STRING(100),
    allowNull:false,
  },
  phone:{
    type: Sequelize.STRING,
    allowNull:false,
  },  
  password:{
    type: Sequelize.STRING,
    allowNull:false,
  },
  bvn:{
    type: Sequelize.STRING,
    allowNull:true,
  },
  dob:{
    type: Sequelize.STRING,
    allowNull:true,
  },
   educate:{
    type: Sequelize.STRING,
    allowNull:true,
  },
   address:{
    type: Sequelize.STRING,
    allowNull:true,
  },
   bank:{
    type: Sequelize.STRING,
    allowNull:true,
  },
   acct:{
    type: Sequelize.STRING,
    allowNull:true,
  },
   fiemerNumber:{
    type: Sequelize.STRING,
    allowNull:true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  otp:{
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  relationship:{
    type: Sequelize.STRING,
  },
  gender:{
    type: Sequelize.STRING,
  },
})
module.exports =userTable
