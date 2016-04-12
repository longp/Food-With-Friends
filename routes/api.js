var express = require('express');
var router = express.Router();
var accountSid = 'ACac2c80a08f5af3c721cd57508e22402c';
var authToken = "c97605c687ac79e81f300c94ea317d40";
var client = require('twilio')(accountSid, authToken);
var yelp  = require('../config/yelp.js');




//yelp route
router.use(function(req, res) {
  var term = req.body.term;
  var location = req.body.location;
  console.log(req.body);
  yelp.search({
    term: term,
    location: location
  })
  .then(function (data) {
    console.log(data.region.center.latitude);
    console.log(data.region.center.longitude);
    for (var i = data.businesses.length - 1; i >= 0; i--) {
      console.log(data.businesses[i].name);
      console.log(data.businesses[i].image_url);
      console.log(data.businesses[i].rating);
      console.log(data.businesses[i].display_phone);
      for (var j = data.businesses[i].categories.length - 1; j >= 0; j--) {
        console.log(data.businesses[i].categories[j][0]);
      }
    }
  });
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




module.exports = router;
