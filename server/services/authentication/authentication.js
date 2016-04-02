/*
  links:
    https://carlosazaustre.es/blog/autenticacion-con-token-en-node-js/
  tasks:
    implement the service for save the users using md5 encryption
    implement authentication token service finding the users in the database
    implement authorization service based in users roles
    implement authorization middleware for get access to api

*/



var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');
const crypto = require('crypto');



var uniqueValidator = require('mongoose-unique-validator');


var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:  {type:String,  unique: true},
  pwd: String,
});

userSchema.plugin(uniqueValidator);

module.exports = {
  createToken : function(username, pwd){
  console.log(crypto.createHash('md5').update("123456").digest("hex"));
  var User = mongoose.model('User', userSchema);

  /*User.findOne({ 'username': 'jhon' }, function (err, user) {
      if (err){console.log(err);}
      else{console.log(user.username);}
  });
*/
    var payload = {
      username: username,
      pwd: pwd,
      role_id: 1,
      iat: moment().unix(),
      exp: moment().add(14, "days").unix(),
    };

    var secret = 'xxx';
    // encode
    var token = jwt.encode(payload, secret);
    console.log(token); //=> { foo: 'bar' }
    // decode
    var decoded = jwt.decode(token, secret);
    console.log(decoded); //=> { foo: 'bar' }

    var promise = new Promise(function(fullfil, reject){

      var user = new User({username: "jhon", pwd: "123456"})

      user.save(function (err) {
      if(err){reject(err);}
      else{fullfil({status: 200});}
      });

    });

    return promise;
  }
};
