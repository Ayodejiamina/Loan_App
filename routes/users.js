const router = require('express').Router()
const {check} = require('express-validator')
const isAuth = require('../middlewares/isLogIn')
const userController = require('../controllers/users')
const allUsers = require('../controllers/user')
router.get('/users',allUsers.allUser)
router.get('/information',isAuth,userController.bank)
router.post('/information',isAuth,[
     check('gender').notEmpty().withMessage('Your gender is required'),
    check('bvn').notEmpty().withMessage('Your bank verification number is required'),
    check('dob').notEmpty().withMessage('Your date of birth is required'),
    // check('Image').notEmpty().withMessage('Image is required'),
    check('educate').notEmpty().withMessage('Your education level '),
    check('houses').notEmpty().withMessage('Housing Status'),
    check('pat').notEmpty().withMessage('Your work pattern '),
    check('add').notEmpty().withMessage('Your home address is required'),
    check('firstname').notEmpty().withMessage('Their name is require'),
    check('rela1').notEmpty().withMessage('Your relationship with his/her '),
    check('phon1').notEmpty().withMessage('His/Her number is required'),
    check('secname').notEmpty().withMessage('Their name is require '),
    check('rela2').notEmpty().withMessage('Your relationship with his/her'),
    check('phon2').notEmpty().withMessage('His/Her number is required'),
    check('bank').notEmpty().withMessage('Your bank name is required'),
    check('acct').notEmpty().withMessage('Kindly input your account number')
],userController.postBank)
router.get('/payment',userController.getPay)
router.post('/payment',userController.postPay)

module.exports = router