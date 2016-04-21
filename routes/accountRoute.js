var express = require('express');
var router = express.Router();
var User = require('../models/user.js');


router.get('/acc/myaccount', function(req, res){
  var userId = req.user.id;
  console.log('also look here!!! userId', userId)
  User.find({_id:userId}, function(err, users){
    if (err) return console.log(err);
    console.log("look here for me as a user!!!!!:", users);
    res.send(users);
  })
})

module.exports = router;
