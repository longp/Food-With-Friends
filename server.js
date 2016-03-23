require('dotenv').config();

var express = require("express");
var expses = require('express-session')
var bodyParser = require("body-parser");
var logger = require('morgan');

var db = require('./config/connection.js');
var passport = require('./config/passport.js');

var index = require('./routes/index.js');
var authenticate = require('./routes/authenticate.js');
var api = require('./routes/api.js');

var PORT = process.env.PORT || 3000;
var app = express();


// Middleware

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expses({
  secret: 'keyboard cat rocks',                                               //CHANGE FOR AN ENV VARIABLE LATER FOR PROD
  resave: true,
  saveUninitialized: true,
  cookie : { secure : false, maxAge : (7 * 24 * 60 * 60 * 1000) } // 7 Days
}));
app.use(passport.initialize());
app.use(passport.session());


// Static Routes

app.use("/", express.static("public"));
app.use("/js", express.static("public/js"));
app.use("/css", express.static("public/css"));


// Routes

app.use('/', index);
app.use('/auth', authenticate);
app.use('/api', api);

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


// Connection to PORT

app.listen(PORT, function() {
    console.log("Listening on:" + PORT)
});

