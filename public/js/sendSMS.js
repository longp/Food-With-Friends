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

//Require Twilio and create REST API
var client = require('twilio')('ACCOUNT_SID', 'AUTH_TOKEN');

//Send an SMS text message
client.sendMessage({

    to:'+19087529887', // Any number
    from: '+14506667788', // MUST BE A TWILIO PHONE NUMBER
    body: 'word to your mother.' // body of the SMS message

}, function(err, responseData) { //this function is executed when a response is received from Twilio

    if (!err) { // "err" is an error received during the request, if any

        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

        console.log(responseData.from); // outputs "+14506667788"
        console.log(responseData.body); // outputs "word to your mother."

    }
});
