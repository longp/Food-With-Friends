// Our accountSid and authToken from twilio.com/user/account
var accountSid = 'ACac2c80a08f5af3c721cd57508e22402c';
var authToken = "c97605c687ac79e81f300c94ea317d40";
var client = require('twilio')(accountSid, authToken);

client.messages.create({
    body: "Long please?! I love you <3",
    to: "+19087529887",
    from: "+19086529320"
}, function(err, message) {
    process.stdout.write(message.sid);
});
