var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/finalProjTest' || process.env.MONGO_DATABASE_URL);
var db = mongoose.connection;

module.exports = db;
