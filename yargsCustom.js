const argv = require('yargs')
  .option('external', {
    alias: 'e',
    default: false,
    boolean: true,
    describe: 'boolean to determine whether to push datas in external DB or in local DB '
  })
  .help()
  .argv

module.exports = { argv }
