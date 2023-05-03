const { validationResult } = require('express-validator')
const regModel = require('../models/auth')


exports.info = (req, res) => {
    let inErr = req.flash('error')
    regModel.findAll().then(result => {
        res.render('users/first-info', { title: "Basic-info", user: result,InErr:inErr })

    })
}
exports.postInfo=(req,res)=>{
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        req.flash('error',errors.array())
        req.session.save(()=>{
            res.redirect('/info')
        })
    }
    else{
        req.session.save(()=>{
            res.redirect('/sinfo')
        })
    }
}
// exports.postInfo = (req, res) => {
//     else{
//     // let imagePath = '/images/' + req.file.filename
//     // const { BVN, dob, gender } = req.body
//     const userId = req.session.userData.id
//     console.log(userId)
    
//     // regModel.findOne({
//     //     where: {
//     //         id: userId
//     //     }
//     // }).then(result => {
//     //         result.bvn = BVN
//     //         // result.dob = dob,
//     //         // result.gender = gender,
//     //         // result.image = imagePath
//     //         req.session.save(()=>{
//     //             res.redirect('/sinfo')
//     //         })
//     //     return result.save()
       
//     // }).catch(err => {
//     //     console.log(err)
//     // })
// }
// }
exports.sinfo = (req, res) => {
    let inErr = req.flash('error')
    res.render('users/sec-info', { title: "Personal-info",InErr:inErr })
}
exports.postSinfo = (req, res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        req.flash('error',errors.array())
        req.session.save(()=>{
            res.redirect('/sinfo')
        })
    }
    // const userId = req.session.userData.id
    // regModel.findOne({
    //     where: {
    //         id: userId
    //     }
    // }).then(result => {
    //     const { educate, address } = req.body
    //     result.educate = educate,
    //         result.address = address

    //     return result.save()
    // }).then(changed => {
    //     req.session.save(() => {
    //         return res.redirect('/emer')
    //     })

    // }).catch(err => {
    //     console.log(err)
    // })
}
exports.emergency = (req, res) => {
    let inErr = req.flash('error')
    res.render('users/emergency', { title: "Emergency-info",InErr:inErr })
}
exports.postEmer = (req, res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        req.flash('error',errors.array())
        req.session.save(()=>{
            res.redirect('/emer')
        })
    }
    // const { phon1 } = req.body
    // const userId = req.session.userData.id
    // regModel.findOne({
    //     where: {
    //         id: userId
    //     }
    // }).then(users => {
    //     users.fiemerNumber = phon1
    // }).then(result => {
    //     req.session.save(() => {
    //         res.redirect('/bank')
    //     })
    // })
}
exports.bank = (req, res) => {
    let inErr = req.flash('error')
    res.render('users/bank-info', { title: "Bank-info",InErr:inErr })
}
exports.postBank = (req, res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        req.flash('error',errors.array())
        req.session.save(()=>{
            res.redirect('/bank')
        })
    }
    // const { bank, acct } = req.body
    // const userId = req.session.userData.id
    // regModel.findOne({
    //     where: {
    //         id: userId
    //     }
    // }).then(users => {
    //     users.acct = acct,
    //         users.bank = bank
    // }).then(result => {
    //     req.session.save(() => {
    //         res.redirect('/dashboard')
    //     })
    // })
}
