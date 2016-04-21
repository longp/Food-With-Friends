var express = require('express');
var router = express.Router();
var User = require('../models/user.js');


router.post('/myaccount', function(req, res){
  var userId = req.user.id;
  User.find({_id:userId}, function(err, users){
    if (err) return console.error(err);
    console.log(users);
  })
})

module.exports = router;
