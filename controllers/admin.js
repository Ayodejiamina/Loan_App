const admin = require('../models/loan')
exports.dashboard = (req, res) => {
    admin.findAll().then(result => {
        res.render('admin/admin-dashboard', { title: "Admin-dashboard", product: result})
    })
}
exports.addLoan=(req, res)=>{
    let succeed = req.flash('succeed')
    res.render('admin/add-loan', { title: "Adding-Loan", success: succeed })

}
exports.postAddLoan=(req, res) => {
    const { term, amount, duration, intrest } = req.body

    admin.create({
        loanTerm: term,
        loanAmount: amount,
        duration: duration,
        intrest: intrest
    }).then(() => {
        res.send({ succeed: true })
    }).catch(err => {
        console.log(err)
    })
    // return res.status(200).json("submitted")  
}
exports.delete = (req, res) => {
    const {delId} = req.body
    admin.findOne({
        where: {
            id: delId
        }
    }).then(result => {
        let datas = result
        return datas.destroy()
    }).then(result => {
        res.redirect('/admin-dashboard')
    }).catch(err => {
        console.log(err)
    })
}
exports.update = (req, res) => {
    const id = req.params.id
    admin.findByPk(id).then(result => {
        res.render('admin/update-loan', { update: result, title: "admin-update" })
    }).catch(err => {
        console.log(err)
    })
}
exports.postUpdate = (req, res) => {
    const { id, term, amount, duration, intrest } = req.body
    admin.findByPk(id).then(result => {
        result.intrest = intrest,
            result.loanTerm = term,
            result.loanAmount = amount,
            result.duration = duration
        return result.save()
    }).then(results => {
        res.redirect('/admin-dashboard')
    }).catch(err => {
        console.log(err)
    })
}

