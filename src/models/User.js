const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const becrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique:true,
    },
    password: {
      type: String,
      required: true
    }
})
userSchema.methods.encryptPassword = (password) =>{
    return becrypt.hashSync(password, becrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function(password) {
  return becrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)