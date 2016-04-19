var express = require('express');
var router = express.Router();
var client = require('../config/twilio.js');
var yelp  = require('../config/yelp.js');
var Event = require('../models/Event.js');
var Place = require('../models/Place.js');
var randomstring = require('randomstring');

//create event route
router.post('/createEvent', function(req, res) {
  var randomS = randomstring.generate(7)
  createEvent(req,res,randomS)
});

// twilio route
router.post('/sendSMS', function(req, res){
  client.messages.create({
      body: "Long please?! I love you <3",
      to: req.body.phone1 + "",
      from: "+19086529320"
  }, function(err, message) {
      process.stdout.write(message.sid);
  });
  console.log(req.body);
  res.send({
    state: "success"
  });
});

//creates teh event and calls createPlaces and addPlaces fx, then sends data to angular
function createEvent (req,res,randomS) {
  var formData = req.body;
  yelp.search({
    term: formData.term,
    location: formData.location
  })
    .then(function(data) {
      var newEvent = new Event({
        name: formData.name,
        location: formData.location,
        searchLat: data.region.center.latitude,
        searchLng: data.region.center.longitude,
        randomUrl: randomS
      });
      newEvent.saveAsync(function (err, event) {
        createPlaces(data, event);
        addPlaces(event);
        populatePlaces(event, res, randomS);
        if(err) {
          res.send({state: 'failure', message: err});
        } else {
          res.send({state: 'success', message: "Event Created! " + event});
        }
      }).
      then(function (doc) {
        console.log(doc)
        console.log('doc')
      })
    })
    .catch(function (err) {
      console.log(err)
    })
}

//creates the places found in the yelpseach location and adds to mongo
function createPlaces (data, event){
  for (var i = data.businesses.length-1; i >= 0; i--) {
    var categoryArr = [];
    if (data.businesses[i].categories.length && data.businesses[i].categories.length>0) {
      for (var j = data.businesses[i].categories.length - 1; j >= 0; j--) {
        categoryArr.push(data.businesses[i].categories[j][0]);
      }
    }
    var newPlace = new Place({
      name: data.businesses[i].name,
      address: data.businesses[i].location.display_address,
      rating: data.businesses[i].rating,
      phone: data.businesses[i].display_phone,
      event: event._id,
      categories: categoryArr
    });
    newPlace.saveAsync(function (err, docs) {})
  }
}

//adds the place Ids to event document
function addPlaces(event) {
  Place.findAsync({event:event._id}, function(err, doc) {
    var cheddar = [];
    cheddar = doc.map(function(n,i) {
      return [n._id]
    })
    Event.findOneAndUpdateAsync({_id:event._id},{places:cheddar}, function (err,doc) {
      if  (err) {
        console.log(err)
      }
    })
  })
}


//population fx
function populatePlaces(event, res, randomS) {
  Event.find({_id:event._id})
  .populate('places')
  .exec(function (err, doc) {
  })
}


module.exports = router;
