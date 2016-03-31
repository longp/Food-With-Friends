var express = require('express');
var router = express.Router();

var User = require('../models/user.js');
var passport = require('../config/passport.js');


// /Register Routes

router.post('/register', function(req, res) {

  console.log(req);

  var newUser = new User(req.body);

  newUser.save(function(err, doc) {
    if(err) {
      res.send({state: 'failure', user: null, message: err});
    } else {
      res.send({state: 'success', user: doc.username, message: "User Created!"});
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
