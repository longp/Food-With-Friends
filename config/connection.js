var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/finalProjTest || MONGODB_URI');
var db = mongoose.connection;

module.exports = db;
