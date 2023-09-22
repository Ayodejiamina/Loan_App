const router = require('express').Router()
const pagesController = require('../controllers/pages')
const isAuth = require('../middlewares/isLogIn')
router.get('/',pagesController.index)
router.get('/dashboard',pagesController.dashboard)
router.get('/final',pagesController.final)
router.post('/stat',isAuth,pagesController.postStatus)


module.exports = router