const mongoose = require('mongoose')
const  credentialsdb = require("./credentials.json")

mongoose.connect(credentialsdb.uri,{useNewUrlParser: true})
const db = mongoose.connection;

db.on('error', () => {
    console.error('connection db error')
});
db.once('open', () => {
  console.log('Database conect')
});

module.exports = db

