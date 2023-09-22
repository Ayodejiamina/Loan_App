const bcrypt = require('bcrypt')
const argon2 = require('argon2')
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
        argon2.hash(password, 12).then(hashedPassword => {
            authModel.create({
                name: name,
                phone: phone,
                email: email,
                status: 'pending',
                otp: code,
                password: hashedPassword,
            }).then(users => {

                const email = {
                    to: users.email,
                    from: {
                        name: "ALoan Credit",
                        email: "aloancredit@gmail.com"
                    },
                    subject: "Verification Code",
                    html: `
                   <div class="containe">
        <h1 class="h1s">Verification Code</h1>
        <p class="ps">Thank you for using our service. To complete your registration, please use the following verification code:</p>
        <div class="verification-code">${users.otp}</div>
        <p class="ps">If you didn't request this verification code, you can safely ignore this email.</p>
        <a class="cta-button" href="#">Verify Your Email</a>
        <p class="ps">If the button above doesn't work, you can also manually enter the verification code on our website.</p>
    </div> 
        `
                }
                var transport = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    service: process.env.SMTP_SERVICE,
                    auth: {
                        user: "aminatayodeji6@gmail.com",
                        pass: "jskavabkjvoievsi"
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
    res.render('auth/login', { title: "Login", loginErr: error, logs: log })
}
exports.postLogin = (req, res) => {
    const { email, password } = req.body
    let logErr = validationResult(req)
    if (!logErr.isEmpty()) {
        req.flash('error', logErr.array())
        req.session.save(() => {
            return res.redirect('/login')
        })
    }
    else {
        authModel.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (!user) {
                req.flash('errors', "user does not exist")
                return req.session.save(() => {
                    res.redirect('/login')
                    return user;
                })
            }
            argon2.verify(user.password, password).then(data => {
                if (!data) {
                    req.flash('err', 'invalid password')
                    req.session.save(() => {
                        return res.redirect('/login')
                    })
                }
                req.session.isLoggedIn = true
                req.session.userData = user
                console.log(data)
                return req.session.save(() => {
                    res.redirect('/information')
                })
            })
        }).catch(err => {
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
        } else {
            req.session.save(() => {
                return res.redirect('/login')
            })
        }
    })
}
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
}
