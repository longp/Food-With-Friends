var express = require('express');
var router = express.Router();
var User = require('../models/user.js');


router.post('/myaccount', function(req, res){
  var userId = req.user._id;
  var username = req.user.username;
  User.find({_id:userId}, function(err, users){
    if (err) return console.log(err);
    console.log(users);
    res.send(users);
  })
})

module.exports = router;
