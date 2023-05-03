const router = require('express').Router()
const authController = require('../controllers/auth')
const {check} = require('express-validator')
router.get('/register',authController.register)
router.post('/register',[
    check('name').notEmpty().withMessage('name is required'),
    check('email').notEmpty().withMessage('email is required'),
    check('phone').notEmpty().withMessage('phone is required'),
    check('password').notEmpty().withMessage('password is required')
],authController.postRegister)
router.get('/login',authController.login)
router.post('/login',[
    check('email').notEmpty().withMessage('email is required'),
    check('password').notEmpty().withMessage('password is required'),
],authController.postLogin)
router.get('/otp',authController.otp)
router.post('/otp',authController.postOtp)

module.exports = router