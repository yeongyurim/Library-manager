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

function zeroAdder(a) {
  if(a<10) a = '0'+a
  a = '' + a;
  return a;
}

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('lending');
});

router.get('/register', function(req, res, next) {
  res.render('lending_register');
});

router.post('/register', function(req,res,next) {

  var today = new Date();
  var ret = new Date(today.getTime()+1000*60*60*24*7);
  var today_MD = zeroAdder(today.getMonth()+1)+zeroAdder(today.getDate());
  var ret_MD = zeroAdder(ret.getMonth()+1)+zeroAdder(ret.getDate());
  var LENDING_DATE = today.getFullYear()+today_MD;
  var EXPECT_RETURN_DATE = ret.getFullYear()+ret_MD;

  var LIBRARY_ID = req.body.LIBRARY_ID;
  var RECORD_ID = req.body.RECORD_ID;

  client.query('select * from holiday where ?<MONTH_DAY and ?>=MONTH_DAY',
  [today_MD,ret_MD],function(err,r){
    if(err) console.log(err);
    if(r){
      EXPECT_RETURN_DATE = String(parseInt(EXPECT_RETURN_DATE)+r.length);
     }
     console.log(r);
  });

  client.query('insert into lending (LIBRARY_ID,RECORD_ID,LENDING_DATE,EXPECT_RETURN_DATE) values (?,?,?,?)',
  [LIBRARY_ID,RECORD_ID,LENDING_DATE,EXPECT_RETURN_DATE],function(err,r){
    if(err) console.log(err);
    console.log(r);
    res.render('lending_register');
  });
});

router.get('/return', function(req,res,next){
  res.render('lending_return');
})

router.post('/return', function(req,res,next){
  var today = new Date();
  var today_MD = zeroAdder(today.getMonth()+1)+zeroAdder(today.getDate());
  var RETURN_DATE = today.getFullYear()+today_MD;
  var RECORD_ID = req.body.RECORD_ID;

  client.query('update lending set RETURN_DATE = ? where RECORD_ID = ? and RETURN_DATE is NULL',
  [RETURN_DATE,RECORD_ID],function(err,r){
    if(err) console.log(err);
    console.log(r);
    res.render('lending_return');
  })

})

router.get('/recent', function(req, res, next) {
  client.query('select * from lending',function (e,r) {
    if (e) throw error ;
      res.render('lending_recent', {data:r} );
  });
});

router.get('/current', function(req, res, next) {
  client.query("select * from lending where RETURN_DATE is NULL",function (e,r) {
    if (e) throw error ;
      res.render('lending_current', {data:r} );
  });
});

router.get('/holiday', function(req, res, next) {
  res.render('lending_holiday');
});

router.post('/holiday', function(req, res, next) {

  var date = req.body.date.split('-');
  var remark = req.body.remark;
  var year = date[0];
  var monthday = date[1]+date[2];

  client.query('insert into holiday (YEAR,MONTH_DAY,TYPE,REMARKS) values (?,?,1,?)',
  [year,monthday,remark],function(err,r){
  if(err) console.log(err);
  console.log(r);
  res.render('lending_holiday');

  });
});

module.exports = router;
