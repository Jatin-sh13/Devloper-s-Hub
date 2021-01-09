const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')
const connectdb = () => {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Moongo DB connected")
    }).catch(err => {
        console.log(err)
    })
}
module.exports = connectdb