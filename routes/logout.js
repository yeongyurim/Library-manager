var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.user = '';
  req.session.member = '';
  req.session.id = '';
  res.redirect('/');
});

module.exports = router;
