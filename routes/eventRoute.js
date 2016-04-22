var express = require('express');
var router = express.Router();
var yelp  = require('../config/yelp.js');
var Event = require('../models/Event.js');
var Place = require('../models/Place.js');
var randomstring = require('randomstring');


//geocoder setup
var geocoderProvider = 'google';
var httpAdapter = 'http';
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter);
router.post('/mine', function (req, res) {
  var userId = req.user.id;
  var username = req.user.username;
  var limit = parseInt(req.body.limit);
  var searchTerm = req.body.location;

  geocoder.geocode({address:searchTerm, minConfidence: 0.5, limit: 5}, function(err, res) {
  })
  .then(function (location) {
    stateLong = location[0].administrativeLevels.level1long;
    stateShort = location[0].administrativeLevels.level1short;
    if (location[0].administrativeLevels.level2short) {
      county = location[0].administrativeLevels.level2short;
    } else {
      county = ''
    }
    var searchLocation = stateLong +' ' + stateShort  +' ' + county
    console.log(searchLocation)
    Event.find({
      $and :
        [
          {createdby:userId},
            {$or:
               [{location:{$regex:stateLong,$options:"$i"}},
                    {location:{$regex:stateShort,$options:"$i"}},
                    {location:{$regex:county,$options:"$i"}},
                ]
            },
        ]
      })
    .populate('places')
    .limit(limit)
    .then(function (data) {
      console.log(data)
      res.send(data);
    })
  });
})


module.exports = router;
