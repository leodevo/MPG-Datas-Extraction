let xlsx = require('node-xlsx').default
require('./config/config')

const { Player } = require('./models/player')
const { constants } = require('./constants')
let { mongoose } = require('./db/mongoose')

const workSheetsFromFile = xlsx.parse(`${__dirname}/datas/Stats${constants.NUMBER_OF_GAMES}.xlsx`)

// TODO : remove players who left during winter mercato
// Remove rules from xlxs file
const teamDataSheets = workSheetsFromFile.slice(1)

function findFirstAndLastPlayer (iTeamDataSheet) {
  let first = null
  let last = null
  let i = 0

  while (iTeamDataSheet.data[i][0] !== 'Poste' && i < constants.MAX_SHEETLENGTH) {
    i++
  }

  if (i !== constants.MAX_SHEETLENGTH) {
    first = ++i
  }

  while (iTeamDataSheet.data[i][0] !== undefined && i < constants.MAX_SHEETLENGTH) {
    i++
  }

  if (i !== constants.MAX_SHEETLENGTH) {
    last = i
  }

  if (first === null || last === null) {
    throw new Error('reached end of file and could not find first and/or last player')
  }

  return { first, last }
}

const extractPlayerDatas = (player, teamName) => {
  let name = player[2]
  let position = player[0]
  let cote = player[1]
  let titularisations = isNaN(player[3]) ? 0 : player[3]
  let substitutions = isNaN(player[4]) ? 0 : player[4]
  let goals = isNaN(player[5]) ? 0 : player[5]
  let average = player[6]
  let grades = []
  let gradesLast10games = []
  let tituAndSubsLast10games = 0 // Titularisations + substitutions from last 10 games
  let sumOfGradesLast10games = 0
  let averageLast10games = null

  for (let val = constants.POS_FIRST_GAME; val < constants.POS_FIRST_GAME + constants.NUMBER_OF_GAMES; val++) {
    grades.push(player[val])
  }

  for (let pos = constants.POS_FIRST_GAME + constants.NUMBER_OF_GAMES - 10; pos < constants.POS_FIRST_GAME + constants.NUMBER_OF_GAMES; pos++) {
    gradesLast10games.push(player[pos])

    if (!isNaN(player[pos])) {
      tituAndSubsLast10games++
      sumOfGradesLast10games += player[pos]
    }
  }

  if (tituAndSubsLast10games > 0) {
    averageLast10games = sumOfGradesLast10games / tituAndSubsLast10games
  }

  let aPlayer = new Player({
    team: teamName,
    name,
    position,
    cote,
    titularisations,
    substitutions,
    tituAndSubs: titularisations + substitutions,
    goals,
    average,
    grades,
    tituAndSubsLast10games,
    averageLast10games
  })

  return aPlayer
}

const extractDatas = () => {
  let playersForDB = []

  for (let teamDataSheet of teamDataSheets) {
    let aPosFisrtAndLastPlayer = findFirstAndLastPlayer(teamDataSheet)
    let teamPlayers = teamDataSheet.data.slice(aPosFisrtAndLastPlayer.first, aPosFisrtAndLastPlayer.last)
    let teamName = constants.TEAM_MAP.get(teamDataSheet.data[0][0])

    console.log(`For ${teamName} : extracting ${teamPlayers.length} players datas`)

    for (let player of teamPlayers) {
      const aPlayerExtracted = extractPlayerDatas(player, teamName)
      playersForDB.push(aPlayerExtracted)
    }
  }

  return playersForDB
}

const savePlayers = (playersForDB) => {
  console.log(`number of players to save : ${playersForDB.length}`)

  let savePlayersPromise = new Promise(function (resolve, reject) {
    let arrayOfPromises = []
    for (let player of playersForDB) {
      arrayOfPromises.push(player.save().then((playerSaved) => {
        // console.log(`Saved player : ${playerSaved.name}`)
      }, (e) => {
        console.log(`for player : ${player.name} an error was encountered :`)
        console.log(e)
      }))
    }

    Promise.all(arrayOfPromises).then(() => {
      resolve()
    })
  })

  return savePlayersPromise
}

const extractAndPushDatas = () => {
  let playersForDB = extractDatas()
  return savePlayers(playersForDB)
}

Player.deleteMany({})
  .then(extractAndPushDatas)
  .then(() => {
    mongoose.connection.close()
  }).catch((e) => {
    console.log(e)
  })
