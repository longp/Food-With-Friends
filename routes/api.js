var express = require('express');
var router = express.Router();
//tammers client sms
var client = require('../config/twilio.js');
// yelp client search with keys
var yelp  = require('../config/yelp.js');
//models from mongoose
var Event = require('../models/Event.js');
var Attendee = require('../models/Attendee.js')
var Place = require('../models/Place.js');
// randomstring for url events
var randomstring = require('randomstring');

//geocoder setup
var geocoderProvider = 'google';
var httpAdapter = 'http';
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter);



//create event route
router.post('/createEvent', function(req, res) {
  var randomS = randomstring.generate(7)
  createEvent(req,res,randomS)
});

// attendee creation routoe
router.post('/createAttendee', function (req, res) {
  var event = req.body.eventId;
  var attendees = req.body.attendees
  var attnArr = [];
  for (i=0;i<attendees.length;i++) {
    var name = req.body.attendees[i].name;
    var phone = req.body.attendees[i].phone;
    if (name === undefined || phone === undefined) {
      break;
    }
    var newAttendee = new Attendee ({
      name:name,
      phone:phone,
      event:event
    });
    Attendee.findOneAndUpdateAsync(
      {name:name,phone:phone,event:event},
      {$setOnInsert: {
        name:name,
        phone:phone,
        event:event
      }},
      {new:true, upsert:true},
      function (err,data) {
        attnArr.push(data._id)
              Event.findOneAndUpdateAsync(
          {_id:event},
          {attendees:attnArr},
          {upsert:true}
        )
      })
  }
})


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
    location: formData.location,
  })
    .then(function(data) {
      var lat = data.region.center.latitude;
      var lon = data.region.center.longitude;
      geocoder.reverse({lat:lat, lon:lon, countryCode: 'us'}, function(err, res) {
      })
      .then(function (location) {
        // new event model with params from yelp search/ and user input
        var newEvent = new Event({
          name: formData.name,
          location: location[0].formattedAddress,
          searchLat: data.region.center.latitude,
          searchLng: data.region.center.longitude,
          createdby: req.user.id,
          eventUrl: randomS
        })

          newEvent.saveAsync(function (err, event) {
            createPlaces(data, event);
            addPlaces(event);
            populatePlaces(event);
            if(err) {
              res.send({state: 'failure', message: err});
            } else {
              res.send({state: 'success', message:event.name + " Event Created!",eventId:event._id, eventUrl:randomS});
            }
          })
        .catch(function (err) {
          console.log(err)
        })
        });
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
      state: data.businesses[i].location.state_code,
      neightborhoods: data.businesses[i].location.neighborhoods,
      rating: data.businesses[i].rating,
      phone: data.businesses[i].display_phone,
      event: event._id,
      categories: categoryArr
    });
    newPlace.saveAsync(function (err, docs) {
      populatePlaces(event, docs)
    })
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
function populatePlaces(event) {
  Event.find({_id:event._id})
  .populate('places')
  .exec(function (err, doc) {
    // console.log(doc)
  })
}
module.exports = router;
