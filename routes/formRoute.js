var express = require('express');
var router = express.Router();
var yelp  = require('../config/yelp.js');
var Event = require('../models/Event.js');
var Place = require('../models/Place.js');
var randomstring = require('randomstring');

router.post('/form', function (req, res) {
  Event.find()
  .populate('places')
  .then(function(data){
    res.send(data);
  })
})


module.exports = router;
