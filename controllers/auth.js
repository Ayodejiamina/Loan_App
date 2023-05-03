const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const authModel = require('../models/auth')
const nodemailer = require('nodemailer');

exports.register = (req, res) => {
    let error = req.flash('errors')
    res.render('auth/register', { title: "Register", errorMsg: error })
}
exports.postRegister = (req, res) => {
    const { name, email, phone, password } = req.body
    let verify;
    let code = []
    for (let i = 0; i < 6; i++) {
        verify = Math.floor(Math.random() * 10)
        code += verify
        console.log(code)
    }
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array())
        req.session.save(() => {
            res.redirect('/register')
        })
    } else {
        bcrypt.hash(password, 12).then(hashedPassword => {
            authModel.create({
                name: name,
                phone: phone,
                email: email,
                status: 'pending',
                otp: code,
                password: hashedPassword
            }).then(users => {
                const email = {
                    to: [users.email, "aloancredit@gmail.com"],
                    from: {
                        name: "ALoan Credit",
                        email: "aloancredit@gmail.com"
                    },
                    subject: "Verification Code",
                    html: `
          <h2>Hello ${users.name}</h2> .
        <h2>Your Verification Code is ${users.otp}</h2> .
        
        <h3>Don't disclose this to anyone!!!</h3>
       
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
                        return res.redirect('/otp');
                    })
                }).catch(err => console.log(err))
                // return res.redirect('/otp');
            })

        }).catch(err => {
            console.log(err)
        })
    }
}
exports.login = (req, res) => {
    let error = req.flash('error')
    let log = req.flash('errors')
    res.render('auth/login', { title: "Login",loginErr:error,logs:log})
}
exports.postLogin = (req, res) => {
    const{email,password}=req.body
    let logErr = validationResult(req)
    if(!logErr.isEmpty()){
        req.flash('error',logErr.array())
        req.session.save(()=>{
            return res.redirect('/login')
        })
    }
 else{
    authModel.findOne({
        where:{
            email:email
        }
    }).then(user=>{
        if(!user){
            req.flash('errors',"user does not exist")
           return req.session.save(()=>{
                 res.redirect('/login')
                return user;
            })  
        }
        bcrypt.compare(password,user.password).then(data=>{
           if(!data){
            req.flash('err','invalid password')
                req.session.save(()=>{
                   return res.redirect('/login')
                })
           } 
           req.session.isLoggedIn = true
            req.session.userData = user
            console.log(user)
           return req.session.save(() => {
                res.redirect('/info')
               })
        })
    }).catch(err=>{
        console.log(err)
    })
 }
    
}
exports.otp = (req, res) => {
    let errors = req.flash('error')
    res.render('auth/otp', { title: "Verifying", error: errors })
}
exports.postOtp = (req, res) => {
    const { Verify } = req.body
    authModel.findOne({
        where: {
            otp: Verify
        }
    }).then(result => {
        if (!result) {
            req.flash('error', 'Invalid verification Code')
            req.session.save(() => {
                res.redirect('/otp')
            })
        }else{
             req.session.save(() => {
            return res.redirect('/login')
        })
    }
    })
}
