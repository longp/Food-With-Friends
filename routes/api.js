var express = require('express');
var router = express.Router();
var client = require('../config/twilio.js');
var yelp  = require('../config/yelp.js');
var Event = require('../models/event.js');
var Place = require('../models/place.js');


// create event /place.post('/createEvent', function(req, res) {
  var formData = req.body;
  yelp.search({
    term: formData.term,
    location: formData.location
  })
  .then(function (data) {

    var newEvent = new Event({
      name: formData.name,
      location: formData.location,
      searchLat: data.region.center.latitude,
      searchLng: data.region.center.longitude
    });

    newEvent.save(function(err, doc) {
      if(err) {
        res.send({state: 'failure', message: err});
      } else {
        res.send({state: 'success', message: "Event Created!"});
      }
    });


    for (var i = data.businesses.length - 1; i >= 0; i--) {
      console.log(data.businesses[i].name);
      console.log(data.businesses[i].image_url);
      console.log(data.businesses[i].rating);
      console.log(data.businesses[i].display_phone);
      if (data.businesses[i].categories.length) {
        for (var j = data.businesses[i].categories.length - 1; j >= 0; j--) {
          console.log(data.businesses[i].categories[j][0]);
        }
      }
    }
  })
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




module.exports = router;
