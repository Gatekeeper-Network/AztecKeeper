var express = require('express');
var router = express.Router();

const serialStuff = require('proofOverSerial')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/serial', function(req,res,next){
  res.send("AGGGG")
});



module.exports = router;
