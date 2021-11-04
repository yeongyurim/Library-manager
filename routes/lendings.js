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
    database: 'book'

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

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('lending');
});

router.get('/register', function(req, res, next) {
  res.render('lending_register');
});

router.post('/register', function(req,res,next) {
  var LIBRARY_ID = req.body.LIBRARY_ID;
  var RECORD_ID = req.body.RECORD_ID;

  client.query('insert into book (LIBRARY)ID values ('+question_mark+')',
  params,function(err,r){
  if(err) console.log(err);

  console.log(r);
  res.render('book_register');

  });
});

router.get('/return', function(req, res, next) {
  res.render('lending_recent');
});

router.get('/current', function(req, res, next) {
  res.render('lending_current');
});

router.get('/holiday', function(req, res, next) {
  res.render('lending_holiday');
});



module.exports = router;
