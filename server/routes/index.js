var express = require('express');
var router = express.Router();
var auth = require('../services/authentication/authentication.js')

/* GET home page. */
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

module.exports = router;
