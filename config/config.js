const { argv } = require('../yargsCustom')
let config = require('./config.json')

const dbLocation = argv.external ? 'external' : 'local'
console.log('DB location : ', dbLocation)

let envConfig = config[dbLocation]

process.env.MONGODB_URI = envConfig['MONGODB_URI']
