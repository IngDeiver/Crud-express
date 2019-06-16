var express = require('express');
var path = require('path')
var morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash');
const {setMessagesAuth} =  require('./src/middlewares/auth')

//Initialize
var app = express();
require('./src/passport/local-auth') //passport methods

//settings
app.set('port', process.env.PORT | 3000)
app.listen(app.get('port'),()=>console.log('Server online'))


//middlewares
app.use(morgan('tiny'))
app.use(express.json({type:'application/json'}))
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'views'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//auth set messages 
app.use(setMessagesAuth)


//db
db = require(__dirname + '/src/database/conection.js')

// routes
app.use(require(__dirname + '/src/routes/routes.js'))

//  manejo de errores
app.use((req,res,next) => {
    res.render('error/404.pug',{url:req.url})
})
app.use((err, req, res, next) => {
        res.render('error/500.pug', {error:err})
})