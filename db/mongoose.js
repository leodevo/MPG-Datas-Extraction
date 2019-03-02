var mongoose = require('mongoose')

mongoose.Promise = global.Promise

// Local and external values of 'MONGODB_URI' must be set by user in a custom config/config.json file
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => {
}, (err) => {
  console.log(err)
})

module.exports = { mongoose }
