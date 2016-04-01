var express = require('express');
var router = express.Router();
var auth = require('../services/authentication/authentication.js')
var userModel = require('../services/users/models.js')


/* GET home page. */

/*
router.get('/:username/:pwd', function(req, res, next) {
  auth.createToken(req.params.username, req.params.pwd).then(
    function(data){
      res.json(data);
    },
    function(err){
      res.json(err);
    }
  );
});
*/


//users services routes
router.post('/users/create/', function(req, res,next){
  var user = userModel.saveUser(req.body);
  user.then(
    function(response){
      res.json(response);
  },function(response){
      console.log("reject");
      console.log(response);
      res.json(response);
  });

});

module.exports = router;
