var yelp = require("node-yelp");
var keys = require('./keys.js');

var client = yelp.createClient({
  oauth: {
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    token: keys.token,
    token_secret: keys.token_secret
  }
});


 module.exports = client;
