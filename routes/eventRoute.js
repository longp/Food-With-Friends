var express = require('express');
var router = express.Router();
var yelp  = require('../config/yelp.js');
var Event = require('../models/Event.js');
var Place = require('../models/Place.js');
var randomstring = require('randomstring');

router.post('/mine', function (req, res) {
  var userId = req.user.id;
  var username = req.user.username;
  var limit = parseInt(req.body.limit);
  var searchLocation = req.body.location
  console.log(req.body.limit)
  //limit search paramter
  // if (req.body.limit === '' ) {
  //   limit = 10;
  // } else {
  //   var limit = parseInt(req.body.limit)
  // };
  // req.body.limit = '';
  // console.log(req.body.limit)
  Event.find({
    $and :[
      {createdby:userId},
      {location:searchLocation}
    ]
    })
  .populate('places')
  .limit(limit)
  .then(function (data) {
    // console.log(data)
    res.send(data);
  })


})


module.exports = router;
