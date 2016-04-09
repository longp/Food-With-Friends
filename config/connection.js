var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI);
var db = mongoose.connection;

module.exports = db;
