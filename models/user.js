var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 20,
    trim: true,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 30,
    trim: true,
    required: true
  },
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 20,
    trim: true,
    lowercase: true,
    required: true
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 20,
    trim: true,
    lowercase: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  activeAcc: {
    type: Boolean,
    default: true
  }
});

UserSchema.pre('save', function(next) {
  var user = this;
  user.password = bcrypt.hashSync(user.password, 10);
  next();
});


var User = mongoose.model('User', UserSchema);
module.exports = User;
