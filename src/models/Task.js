const mongoose = require('mongoose')
const Schema = mongoose.Schema;

taskSchema = mongoose.Schema({
    title:String,
    description:String
})

module.exports = mongoose.model('Task',taskSchema)