var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema ({
  name:{
    type: String,
    require: true
  },
  Location:{
    type: String,
    require: true
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
    require: true
  },
  date:{
    type: Date,
    require: true
  },
  createdby:[{type:Schema.Types.ObjectId, ref:"User"}],
  attendee:[{type:Schema.Types.ObjectId, ref:"Attendee"}]
})

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;
