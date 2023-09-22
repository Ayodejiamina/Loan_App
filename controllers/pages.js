const regUser = require('../models/auth')
const applied = require('../models/success')
const loan = require('../models/loan')
const nodemailer = require("nodemailer")
exports.index = (req,res)=>{
    res.render('index.ejs',{title:"Home"})
}
exports.final = (req,res)=>{
    let username;
    username = req.session.userData.name
    res.render('final.ejs',{title:'final',name:username})
}

exports.dashboard = (req, res) =>{
    let users;
    users = req.session.userData
    loan.findAll().then(result=>{
        res.render('user-dashboard',{title:'dashboard',profile:users,loan:result })
    })
}
// exports.postStatus = (req,res)=>{
    
//     let userId = req.session.userData.id
//     regUser.findOne({
//         where:{
//             id:userId
//         }
//     }).then(result=>{
//         result.status = "Applied"
//         return result.save()
//     }).then(all=>{
//         res.redirect('/final')
//     }).catch(err=>{
//         console.log(err)
//     })

// }
exports.postStatus = (req,res)=>{
    const{amt,id,email,term,name,bank,time,bvn,phone,acct}= req.body
    applied.create({
        amt:amt,
        ema:email,
        nam:name,
        banks:bank,
        bVn:bvn,
        term:term,
        time:time,
        phon:phone,
        accts:acct
    }).then(result=>{
        const email = {
            to: [result.ema, "aloancredit@gmail.com"],
            from: {
                name: "ALoan Credit",
                email: "aloancredit@gmail.com"
            },
            subject: "Loan Approval",
            html: `
  <h2>Hello ${result.nam}</h2> .
<h2>Your Loan Has been been approved suuceesfully </h2> .

<h3>Please kindly stick to the time.</h3>

`
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "d35dde509992f8",
                pass: "a71f3840f520c5"
            }
        });
        transport.sendMail(email).then((respons) => {
            req.session.save(() => {
                return res.redirect('/final');
            })
        }).catch(err => console.log(err))

      const timeOut = parseInt(result.time)*30*24*60*60*1000
    //    function setReminder(){

    //    }

console.log(timeOut)

    }).catch(err=>{
        console.log(err)
    })
}