var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = new Schema ({
  name:{
    type:STRING,
    require:true,
  },
  address:{
    type:STRING,
    require:true,
  }
});
