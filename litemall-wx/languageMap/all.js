var Chinese = require("./Chinese")
var English = require("./English")
var Korean=require("./Korean")
var Russian=require('./Russian')
var Japanese=require('./Japanese')

var languageMaps = {
  'Chinese':Chinese,
  'English':English,
  'Japanese':Japanese,
  'Russian':Russian,
  'Korean':Korean
}

module.exports = languageMaps