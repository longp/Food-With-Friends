var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/finalProjTest' || process.env.MONGODB_URI);
var db = mongoose.connection;

module.exports = db;
