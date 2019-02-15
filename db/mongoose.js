var mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/MPG', { useNewUrlParser: true }).then(() => {
}, (err) => {
  console.log(err)
})

module.exports = { mongoose }
