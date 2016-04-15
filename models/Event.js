var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema ({
  name:{
    type: String,
    require: true
  },
  location:{
    type: String,
    require: true
  },
  phone:{
    type: String,
  },
  searchLat:{
    type: String
  },
  searchLng:{
    type: String
  },
  places:[{type:Schema.Types.ObjectId, ref: "Place"}],
  time:{
    type: String,
    // require: true
  },
  date:{
    type: Date,
    // require: true
  },
  createdby:[{type:Schema.Types.ObjectId, ref:"User"}],
  attendee:[{type:Schema.Types.ObjectId, ref:"Attendee"}]
});

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;
