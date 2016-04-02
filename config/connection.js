var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/finalProjTest' || process.env.MONGOLAB_URI);

module.exports = db;
