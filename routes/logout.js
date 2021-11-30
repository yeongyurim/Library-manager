var express = require('express');
var router = express.Router();


// GET /
router.get('/', function(req, res, next) {
  req.session.user = '';
  req.session.member = '';
  req.session.id = '';
  res.redirect('/');
});

module.exports = router;
