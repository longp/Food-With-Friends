var express = require('express');
var router = express.Router();
var yelp  = require('../config/yelp.js');
var key  = require('../config/keys.js');


router.get('/yelpKey', function (req, res) {
  res.send(JSON.stringify(key));
  console.log(key);
})

module.exports = router;
