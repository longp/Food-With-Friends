var express = require('express');
var router = express.Router();
var yelp  = require('../config/yelp.js');

app.get('/yelp', function(req ,res ) {
  yelp.search({
    terms:"hotdogs",
    location:'Piscataway, NJ'
  })
})




module.exports = router;
