const login = (req,res) => {
    res.render('auth/login.pug')
}

const signup = (req, res, next) => {
    res.render('auth/signup.pug')
}
module.exports = {
    login,
    signup
}