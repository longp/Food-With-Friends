var express = require('express');
var router = express.Router();
var yelp  = require('../config/yelp.js');

router.use(function(req ,res ) {
  var term = req.body.term;
  var location = req.body.location;
  var restaurant = [];
  var place = [];
  yelp.search({
    term:term,
    location:location
  })
  .then(function (data) {
    (data.businesses).forEach(function (element, index, array) {
      console.log(element);
      restaurant.push(element)
    })
    console.log(restaurant)

    res.send(restaurant);
  })
})
module.exports = router;
