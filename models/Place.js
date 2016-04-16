var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = new Schema ({
  name:{
    type:String,
    require:true,
  },
  address:{
    type:String,
    require:true,
  }
});
