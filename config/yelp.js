var yelp = require("node-yelp");
var keys = require('./keys.js');

var yelp = yelp.createClient({
  oauth: {
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    token: keys.token,
    token_secret: keys.token_secret
  },
  // Optional settings:
  httpClient: {
    maxSockets: 25  // ~> Default is 10
  }
});


yelp.search({
  terms:"hotdogs",
  location:"Edison, NJ"
}).then(function (data) {
  console.log(data)
})


 module.exports = yelp;
