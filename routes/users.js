const router = require('express').Router()
const {check} = require('express-validator')
const userController = require('../controllers/users')
router.get('/info',userController.info)
router.post('/info',[
check('fname').notEmpty().withMessage('First Name is required'),
check('lname').notEmpty().withMessage('Last Name is required'),
check('email').notEmpty().withMessage('Your email is required'),
check('gender').notEmpty().withMessage('Your gender is required'),
check('phone').notEmpty().withMessage('Your Phone Number is required'),
check('BVN').notEmpty().withMessage('Your bank verification number is required'),
check('dob').notEmpty().withMessage('Your date of birth is required'),
check('Image').notEmpty().withMessage('First Name is required')

],userController.postInfo)
router.get('/sinfo',userController.sinfo)
router.post('/sinfo',[
    check('marital').notEmpty().withMessage('Your marital status'),
    check('educate').notEmpty().withMessage('Your education level '),
    check('houses').notEmpty().withMessage('Housing Status'),
    check('pat').notEmpty().withMessage('Your work pattern '),
    check('add').notEmpty().withMessage('Your home address is required')
    
],userController.postSinfo)
router.get('/emer',userController.emergency)
router.post('/emer',[
    check('firstname').notEmpty().withMessage('Their name is require'),
    check('rela1').notEmpty().withMessage('Your relationship with his/her '),
    check('phon1').notEmpty().withMessage('His/Her number is required'),
    check('secname').notEmpty().withMessage('Their name is require '),
    check('rela2').notEmpty().withMessage('Your relationship with his/her'),
    check('phon2').notEmpty().withMessage('His/Her number is required')
],userController.postEmer)
router.get('/bank',userController.bank)
router.post('/bank',[
    check('bank').notEmpty().withMessage('Your bank name is required'),
    check('acct').notEmpty().withMessage('Kindly input your account number')
],userController.postBank)

module.exports = router