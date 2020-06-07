var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoosse = require('passport-local-mongoose');

var User = new Schema({
   firstname: {
      type: String,
      default: ''
   },
   lastname: {
      type: String,
      default: ''
   },
   admin: {
      type: Boolean,
      default: false
   },
   facebookId: String
})
User.plugin(passportLocalMongoosse);

module.exports = mongoose.model('User', User);