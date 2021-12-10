var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// DBMS connection

try{

  var client = mysql.createConnection({

    host :'localhost',
    port : 3333,
    user:'root',
    password:'123456',
    database: 'nbook'

  });
}
catch(e) {
  console.log(e.name);
  console.log(e.message);
}

client.connect((err) => {
  if (err) throw err;
  console.log('DBMS Connected!-----!!');
});

/** DBMS Connected
*/

/* GET home page. */

router.get('/', function(req, res, next) {

  if(req.session.user){
    user = req.session.user;
    client.query('select name,count(name) as count from statis group by name order by count(name) desc',
    function(err,r){
      if(err) console.log(err);
      if(r){
        console.log(r);
        res.render('index',{name : user, data:r});
      }
      else {
        res.render('index',{name : user, data:''});
      }
    });
  }
  else{
    res.redirect('/login')
  }
});

module.exports = router;
