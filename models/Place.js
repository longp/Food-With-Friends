var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = new Schema ({
  name:{
    type: String,
    require:true,
  },
  address:{
    type:String,
    require:true,
  },
  rating : {
    type:Number
  },
  phone: {
    type: String
  },
  categories: [{
    type:String
  }]
});

var Place = mongoose.model('Place', placeSchema);
module.exports = Place;
