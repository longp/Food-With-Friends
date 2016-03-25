var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema ({
  name:{
    type:STRING,
    require:true,
  },
  Location:{
    type:STRING,
    require:true,
  },
  places:[{type:Schema.Types.ObjectId, ref: "Place"}],
  time:{
    type:STRING,
    require:true,
  },
  date:{
    type:DATE,
    require:true,
  },
  createdby:[{type:Schema.Types.ObjectId, ref:"User"}],
  attendee:[{type:Schema.Types.ObjectId, ref:"Attendee"}]
})

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;
