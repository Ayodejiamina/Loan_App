const router = require('express').Router()
const adminController = require('../controllers/admin')
router.get('/loan',adminController.addLoan)
router.post('/loan',adminController.postAddLoan)
router.get('/admin-dashboard',adminController.dashboard)
router.post('/delete',adminController.delete)
router.get('/update/:id',adminController.update)
router.post('/update',adminController.postUpdate)
module.exports = router