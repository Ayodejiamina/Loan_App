const users = require('../models/auth')
exports.allUser = (req,res,next)=>{
  users.findAll().then(result=>{
    res.json([result])  
  })
}