var express = require('express');
var router = express.Router();
var yelp  = require('../config/yelp.js');

router.use(function(req ,res ) {
  var term = req.body.term;
  var location = req.body.location;
  console.log(req.body)
  yelp.search({
    term:term,
    location:location
  })
  .then(function () {console.log('success')})
})




module.exports = router;
