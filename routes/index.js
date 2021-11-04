var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    user = req.session.user;
    res.render('index',{ name : user });
  }
  else if(req.session.member){
    member = req.session.member;
    res.render('members_index',{name : member});
  }
  else{
    res.redirect('/login')
  }
});

module.exports = router;
