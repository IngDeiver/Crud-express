module.exports = {
    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated())
            return next()
        res.redirect('/user/login')
    },
    setMessagesAuth: (req, res, next) => {
        req.app.locals.message = req.flash('message')
        next()
    }
}