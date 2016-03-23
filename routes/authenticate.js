var express = require('express');
var router = express.Router();

var User = require('../models/user.js');
var passport = require('../config/passport.js');


// /Register Routes

router.post('/register', function(req, res) {
  var newUser = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  }

  var newUser = new User(newUser);

  newUser.save(function(err, doc) {
    if(err) {
      // Tell user to fill out form correctly
    } else {
      // Redirect to home page
    }
  });
});


// /Login Routes

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.render('login', { msg: "Invalid Login Credentials" }); }
    console.log(user);
    if (!user.activeAcc) { return res.render('login', { msg: "Please Check Email To Activate Account" }); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/user/' + user.username);
    });
  })(req, res, next);
});


module.exports = router;
