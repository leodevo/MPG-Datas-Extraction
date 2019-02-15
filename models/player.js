let mongoose = require('mongoose')

let Player = mongoose.model('Player', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
    trim: true
  },
  team: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 4,
    trim: true
  },
  position: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1,
    trim: true
  },
  cote: {
    type: Number,
    minlength: 1,
    maxlength: 3,
    default: null
  },
  titularisations: {
    type: Number,
    minlength: 1,
    maxlength: 3,
    default: null
  },
  substitutions: {
    type: Number,
    minlength: 1,
    maxlength: 3,
    default: null
  },
  tituAndSubs: {
    type: Number,
    minlength: 1,
    maxlength: 3,
    default: null
  },
  goals: {
    type: Number,
    minlength: 1,
    maxlength: 3,
    default: null
  },
  average: {
    type: Number,
    default: null
  },
  grades: {
    type: [],
    required: true
  },
  tituAndSubsLast10games: {
    type: Number,
    minlength: 1,
    maxlength: 3,
    default: null
  },
  averageLast10games: {
    type: Number,
    default: null
  }
})

module.exports = { Player }
