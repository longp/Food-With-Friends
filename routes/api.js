var express = require('express');
var router = express.Router();
var client = require('../config/twilio.js');
var yelp  = require('../config/yelp.js');
var Event = require('../models/event.js');
var Place = require('../models/place.js');



//create event route
router.post('/createEvent', function(req, res) {
  var place_id = [];
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
      searchLng: data.region.center.longitude,
      createdby: req.user.id
      });
    newEvent.save(function(err, doc) {
      if(err) {
        res.send({state: 'failure', message: err});
      } else {
        res.send({state: 'success', message: "Event Created! " + doc});
      }
    });
    
    for (var i = 4; i >= 0; i--) {
      var categoryArr = [];
      if (data.businesses[i].categories.length && data.businesses[i].categories.length>0) {
        for (var j = data.businesses[i].categories.length - 1; j >= 0; j--) {
          categoryArr.push(data.businesses[i].categories[j][0]);
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
        // place_id.push(docs._id)
        //
      }).then(function (docs) {
        place_id.push(docs._id);
        Event.findOneAndUpdate(
          {createdby:req.user.id},
           {places: place_id},
           function(err, docs) {
             console.log(docs)
           }
         )
        });
    }


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
