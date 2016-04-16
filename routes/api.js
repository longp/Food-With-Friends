var express = require('express');
var router = express.Router();
var client = require('../config/twilio.js');
var yelp  = require('../config/yelp.js');
var Event = require('../models/event.js');
var Place = require('../models/place.js');


//create event route
router.post('/createEvent', function(req, res) {
  var formData = req.body;
  yelp.search({
    term: formData.term,
    location: formData.location
  })
  .then(function (data) {
    var place_id = [];
    for (var i = data.businesses.length - 1; i >= 0; i--) {
      var categoryArr = [];
      if (data.businesses[i].categories.length) {
        for (var j = data.businesses[i].categories.length - 1; j >= 0; j--) {
          categoryArr.push(data.businesses[i].categories[j][0]);
          // console.log("categories " + data.businesses[i].categories[j][0]);
        }
      }
      // console.log("category arr " +categoryArr);
      var newPlace = new Place({
        name: data.businesses[i].name,
        address: data.businesses[i].location.display_address,
        rating: data.businesses[i].rating,
        phone: data.businesses[i].display_phone,
        categories: categoryArr
      });
      newPlace.save(function (err, docs) {
        if (err) {
          console.log(err)
        } else {
          place_id.push(docs._id);
          console.log(place_id);
        }
      });

    }

    // console.log(data.businesses[0].location);
    var newEvent = new Event({
      name: formData.name,
      location: formData.location,
      searchLat: data.region.center.latitude,
      searchLng: data.region.center.longitude,
      createdby: req.user.id,
      places:place_id
      });
    newEvent.save(function(err, doc) {
      if(err) {
        res.send({state: 'failure', message: err});
      } else {
        res.send({state: 'success', message: "Event Created!" + doc});
      }
    });
      // console.log("name " + data.businesses[i].name);
      // console.log("img url " + data.businesses[i].image_url);
      // console.log("rating "+ data.businesses[i].rating);
      // console.log("phone "+ data.businesses[i].display_phone);
  });
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
