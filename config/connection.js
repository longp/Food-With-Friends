var mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb://localhost/finalProjTest' || process.env.MONGOLAB_URI);
var db = mongoose.connection;

module.exports = db;
