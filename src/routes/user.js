var express = require('express')
var router = express.Router()
const passport = require('passport')

const UserController = require('../controller/userController.js')

router.get('/signup', UserController.signup)

router.post('/signup', passport.authenticate('local-signup', { 
    successRedirect: '/task/list',
    failureRedirect: '/user/signup'
}))

router.post('/login', passport.authenticate('local-login',{
    successRedirect : '/task/list',
    failureRedirect : '/user/login',
}))

router.get('/login', UserController.login)

router.get('/logout', (req, res, next) => {
    req.logOut()
    res.redirect('/')
})

module.exports = router