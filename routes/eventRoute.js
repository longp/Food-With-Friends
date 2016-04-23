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
  if (searchTerm===undefined) {
    searchTerm = false
  }
  console.log("searchtern" + searchTerm)
  geocoder.geocode({address:searchTerm, minConfidence: 0.5, limit: 5}, function(err, res) {
  })
  .then(function (location) {
    console.log("searchtern" + searchTerm)

    stateLong = location[0].administrativeLevels.level1long;
    stateShort = location[0].administrativeLevels.level1short;
    if (searchTerm) {
      Event.find({
        $and :[{createdby:userId},
          {$or:[{location:{$regex:stateLong,$options:"$i"}},
                {location:{$regex:stateShort,$options:"$i"}},]},
        ]
      })
      .populate('places')
      .populate('attendees')
      .limit(limit)
      .then(function (data) {
        res.send(data);
      })
      console.log('the first one ran')
    
    } else {
      Event.find({createdby:userId})
      .populate('places')
      .populate('attendees')
      .limit(limit)
      .then(function (data) {
        console.log(data)
        res.send(data);
      })
      console.log('the 2nd one ran')

    }
  });
})


function findbyLocation (userId, limit, stateLong, stateShort) {
  Event.find({
    $and :[{createdby:userId},
      {$or:[{location:{$regex:stateLong,$options:"$i"}},
            {location:{$regex:stateShort,$options:"$i"}},]},
    ]
  })
  .populate('places')
  .populate('attendees')
  .limit(limit)
  .then(function (data) {
    res.send(data);
  })
}

function findAllAndPopulate (userId, limit) {
  Event.find({createdby:userId})
  .populate('places')
  .populate('attendees')
  .limit(limit)
  .then(function (data) {
    console.log(data)
    res.send(data);
  })
}

module.exports = router;
