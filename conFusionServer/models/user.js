var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoosse = require('passport-local-mongoose');

var User = new Schema({

   admin: {
      type: Boolean,
      default: false
   }
})
User.plugin(passportLocalMongoosse);

module.exports = mongoose.model('User', User);