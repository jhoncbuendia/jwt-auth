var express = require('express');
var router = express.Router();
var userModel = require('./models.js')


//users services routes
router.post('/create/', function(req, res,next){
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
