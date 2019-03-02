const TEAM_MAP = new Map([
  ['Amiens SC', 'ASC'],
  ['FC Nantes', 'FCN'],
  ['En Avant Guingamp', 'EAG'],
  ['Montpellier Hérault SC', 'MHSC'],
  ['AS Monaco', 'ASM'],
  ['RC Strasbourg Alsace', 'RCSA'],
  ['Toulouse FC', 'TFC'],
  ['SM Caen', 'SMC'],
  ['FC Girondins de Bordeaux', 'FCGB'],
  ['Stade Rennais FC', 'SRFC'],
  ['AS Saint-Etienne', 'ASSE'],
  ['Olympique Lyonnais', 'OL'],
  ['Nîmes Olympique', 'NO'],
  ['Stade Rennais FC', 'SRFC'],
  ['Paris SG', 'PSG'],
  ['OGC Nice', 'OGCN'],
  ['Stade de Reims', 'SR'],
  ['Lille OSC', 'LOSC'],
  ['Olympique de Marseille', 'OM'],
  ['Dijon FCO', 'DFCO'],
  ['SCO d\'Angers', 'SCO']
])

const constants = {
  POS_FIRST_GAME: 7,
  NUMBER_OF_GAMES: 25,
  MAX_SHEETLENGTH: 50,
  NUMBER_DISPLAY_DECIMALS_AVERAGE: 3,
  TEAM_MAP
}

module.exports = { constants }
