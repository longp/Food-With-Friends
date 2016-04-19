var express = require('express');
var router = express.Router();
var client = require('../config/twilio.js');
var yelp  = require('../config/yelp.js');
var Event = require('../models/Event.js');
var Place = require('../models/Place.js');

//create event route
router.post('/createEvent', function(req, res) {
  createEvent(req,res)
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

function createEvent (req,res) {
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
        // places
      });
      newEvent.saveAsync(function (err, event) {
        createPlaces(data, event);
        addPlaces(event);
        populatePlaces(event, res);
        // if(err) {
        //   res.send({state: 'failure', message: err});
        // } else {
        //   res.send({state: 'success', message: "Event Created! " + event});
        // }
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

function populatePlaces(event, res) {
  Event.find({_id:event._id})
  .populate('places')
  .exec(function (err, doc) {
    if(err) {
      res.send({state: 'failure', message: err});
    } else {
      res.send({state: 'success', message: "Event Created! " + doc});
    }
  })
}


module.exports = router;
