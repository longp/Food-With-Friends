var express = require('express');
var router = express.Router();
var accountSid = 'ACac2c80a08f5af3c721cd57508e22402c';
var authToken = "c97605c687ac79e81f300c94ea317d40";
var client = require('twilio')(accountSid, authToken);

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
