const http = require('http')
const express = require('express')
const sequelize = require('./database/connect')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const path = require('path')
const session = require('express-session')
const multer = require('multer')
const user = require('./models/auth')
const loan = require('./models/loan')
const mySession = require('./models/session')
const pagesRoutes = require('./routes/pages')
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/users')
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const app = express()
app.use(flash())
app.use(session({
    secret: 'my loan project',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    }),
    cookie: {}
}))
let multStorage = multer.diskStorage({
    destination :(req,file,cb)=>{
      cb(null,'public/images')  
    },
    filename:(req,file,cb)=>{
        cb('null',Date.now() + file.originalname)
    }
})
app.use(multer({storage:multStorage}).single('Image'))
// app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({encoded:true}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.use(pagesRoutes)
app.use(adminRoutes)
app.use(userRoutes)
app.use(authRoutes)
//user.sync({force:true})
sequelize.sync().then(result => {
    app.listen(3001)
}).catch(err => {
    console.log(err)
})