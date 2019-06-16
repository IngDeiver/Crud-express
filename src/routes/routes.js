var express = require('express')
var router = express.Router()
const {isAuthenticated} = require('../middlewares/auth')

//index
router.get('/',(req, res) => res.render('index'))
//user
router.use('/user', require('./user.js'))
//task
router.use('/task', isAuthenticated, require('./task.js'))

module.exports = router