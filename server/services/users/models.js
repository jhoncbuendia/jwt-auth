var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:  {type:String,  unique: true},
  pwd: String,
});

userSchema.plugin(uniqueValidator);
var User =  mongoose.model('User', userSchema);


function validateUser(user){

  //sconsole.log(user);
  if(('username' in user) && ('pwd' in user)) return true;
  else return false;
};



module.exports  = {

    saveUser: function(u){

      //user['pwd'] = crypto.createHash('md5').update(user['pwd']).digest("hex");
      var response = {};
      var flag = validateUser(u);


      var promise = new Promise(function(fullfil, reject){
        if(flag){
          u['pwd'] = crypto.createHash('md5').update(u['pwd']).digest("hex");
          var user = new User(u);
          user.save(function (err) {
          if(err){
            response['code'] = 404;
            response['response'] = err;
            reject(response);
          }
          else{
            response['code'] = 200;
            response['response'] = "user saved";
            fullfil(response);
          }
          });
        }else{
          response['code'] = 404;
          response['response'] = "invalid user data format, body expected {'username': '', 'pwd': ''}";
          reject(response);
        }
      });

      return promise;

  },
};
