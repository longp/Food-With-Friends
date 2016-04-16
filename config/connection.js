var mongoose = require('mongoose');

mongoose.createConnection('mongodb://localhost/finalProjTest' || process.env.MONGOLAB_URI);
var db = mongoose.createConnection;

module.exports = db;
