var express = require('express');
var router = express.Router();
var yelp  = require('../config/yelp.js');
var Event = require('../models/Event.js');
var Place = require('../models/Place.js');
var randomstring = require('randomstring');

router.post('/mine', function (req, res) {
  var userId = req.user.id;
  var username = req.user.username;
  Event.find({createdby:userId})
  .populate('places')
  .then(function (data) {
    res.send(data);
  })
  // Event.find()
  // .populate('places')
  // .then(function(data){
  //   res.send(data);
  // })
})


module.exports = router;
