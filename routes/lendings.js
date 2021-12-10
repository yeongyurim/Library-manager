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

/*
FUNCTION
*/
function zeroAdder(a) {
  if(a<10) a = '0'+a
  a = '' + a;
  return a;
}


// GET /
router.get('/', function(req, res, next) {
  res.render('lending');
});

/*
  REGISTER
*/

// GET REGISTER
router.get('/register', function(req, res, next) {
  res.render('lending_register');
});

// POST REGISTER
router.post('/register', function(req,res,next) {

  var today = new Date();
  var ret = new Date(today.getTime()+1000*60*60*24*7);
  var today_MD = zeroAdder(today.getMonth()+1)+zeroAdder(today.getDate());
  var ret_MD = zeroAdder(ret.getMonth()+1)+zeroAdder(ret.getDate());
  var LENDING_DATE = today.getFullYear()+today_MD;
  var EXPECT_RETURN_DATE = ret.getFullYear()+ret_MD;

  var LIBRARY_ID = req.body.LIBRARY_ID;
  var RECORD_ID = req.body.RECORD_ID;

  client.query('select * from holiday where ? = MONTH_DAY',
  [ret_MD],function(err,r){
    if(err) console.log(err);
    if(r){
      EXPECT_RETURN_DATE = String(parseInt(EXPECT_RETURN_DATE)+1);
      client.query('insert into lending (LIBRARY_ID,RECORD_ID,LENDING_DATE,EXPECT_RETURN_DATE) values (?,?,?,?)',
      [LIBRARY_ID,RECORD_ID,LENDING_DATE,EXPECT_RETURN_DATE],function(err,r){
        if(err) console.log(err);
        console.log(r);
        res.render('lending_register');
      });
     }
     else{
       client.query('insert into lending (LIBRARY_ID,RECORD_ID,LENDING_DATE,EXPECT_RETURN_DATE) values (?,?,?,?)',
       [LIBRARY_ID,RECORD_ID,LENDING_DATE,EXPECT_RETURN_DATE],function(err,r){
         if(err) console.log(err);
         console.log(r);
         res.render('lending_register');
       });
     }
  });
});
/*
  RETURN
*/

// GET RETURN
router.get('/return', function(req,res,next){
  client.query("select * from lending where RETURN_DATE is NULL",function (e,r) {
    if (e) throw error ;
      res.render('lending_return', {data:r} );
  });
})

// POST RETURN
router.post('/return', function(req,res,next){
  var today = new Date();
  var today_MD = zeroAdder(today.getMonth()+1)+zeroAdder(today.getDate());
  var RETURN_DATE = today.getFullYear()+today_MD;
  var RECORD_ID = req.body.RECORD_ID;

  client.query('update lending set RETURN_DATE = ? where RECORD_ID = ? and RETURN_DATE is NULL',
  [RETURN_DATE,RECORD_ID],function(err,r){
    if(err) console.log(err);
    console.log(r);
    client.query("select * from lending where RETURN_DATE is NULL",function (e,r) {
      if (e) throw error ;
        res.render('lending_return', {data:r} );
    });
  });

});
/*
  RECENT
*/
// GET RECENT
router.get('/recent', function(req, res, next) {
  var sql = [];

  sql[0] = "select LENDING.LENDING_SEQ, LENDING.RECORD_ID, LENDING.LIBRARY_ID, BOOK.TITLE_OF_BOOK, MEMBER.NAME, LENDING.LENDING_DATE, LENDING.RETURN_DATE";
  sql[1] = " from lending left join book on lending.record_id = book.record_id join member on lending.library_id = member.library_id where RETURN_DATE is not NULL";
  client.query(sql[0]+sql[1],function (e,r) {
    if (e) throw error ;
      res.render('lending_recent', {data:r});
  });
});

// POST RECENT
router.post('/recent', function(req, res, next) {
  var id = req.body.Serch;
  var radio = req.body.radio;
  var sql = [];

  sql[0] = "select LENDING.LENDING_SEQ, LENDING.RECORD_ID, LENDING.LIBRARY_ID, BOOK.TITLE_OF_BOOK, MEMBER.NAME, LENDING.LENDING_DATE, LENDING.RETURN_DATE";
  sql[1] = " from lending left join book on lending.record_id = book.record_id join member on lending.library_id = member.library_id where RETURN_DATE is not NULL AND "+radio+"= ?";
  client.query(sql[0]+sql[1],[id],
    function (e,r) {
    if (e) throw error ;
      res.render('lending_recent', {data:r});
  });
});
/*
  CURRENT
*/
//GET CURRENT
router.get('/current', function(req, res, next) {
  var sql = [];

  sql[0] = "select LENDING.LENDING_SEQ, LENDING.RECORD_ID, LENDING.LIBRARY_ID, BOOK.TITLE_OF_BOOK, MEMBER.NAME, LENDING.LENDING_DATE, LENDING.EXPECT_RETURN_DATE";
  sql[1] = " from lending left join book on lending.record_id = book.record_id join member on lending.library_id = member.library_id where RETURN_DATE is NULL";
  client.query(sql[0]+sql[1],function (e,r) {
    if (e) throw error ;
      res.render('lending_current', {data:r});
  });
});

//POST CURRENT
router.post('/current', function(req, res, next){
  var id = req.body.Serch;
  var radio = req.body.radio;
  var sql = [];

  sql[0] = "select LENDING.LENDING_SEQ, LENDING.RECORD_ID, LENDING.LIBRARY_ID, BOOK.TITLE_OF_BOOK, MEMBER.NAME, LENDING.LENDING_DATE, LENDING.EXPECT_RETURN_DATE";
  sql[1] = " from lending left join book on lending.record_id = book.record_id join member on lending.library_id = member.library_id where RETURN_DATE is NULL AND "+radio+"= ?";
  client.query(sql[0]+sql[1],[id],
    function (e,r) {
    if (e) throw error ;
      res.render('lending_current', {data:r});
  });
});
/*
  HOLIDAY
*/
//GET HOLIDAY
router.get('/holiday', function(req, res, next) {
  client.query('select * from holiday',function(err,r){
    if(err) console.log(err);
    res.render('lending_holiday',{data:r});
  });
});

//POST HOLIDAY
router.post('/holiday', function(req, res, next) {

  var date = req.body.date.split('-');
  var remark = req.body.remark;
  var year = date[0];
  var monthday = date[1]+date[2];

  client.query('insert into holiday (YEAR,MONTH_DAY,TYPE,REMARKS) values (?,?,1,?)',
  [year,monthday,remark],function(err,r){
  if(err) console.log(err);
  console.log(r);
  client.query('select * from holiday',function(err,r){
    if(err) console.log(err);
    res.render('lending_holiday_delete',{data:r});
  });
  });
});
/*
  HOLIDAY/DELETE
*/
//GET HOLIDAY/DELETE
router.get('/holiday/delete', function(req, res, next) {
  client.query('select * from holiday',function(err,r){
    if(err) console.log(err);
    res.render('lending_holiday_delete',{data:r});
  });
});

//POST HOLIDAY/DELETE
router.post('/holiday/delete', function(req, res, next) {

  var date = req.body.date;

  client.query('delete from holiday where month_day = ?',
  [date],function(err,r){
    if(err) console.log(err);
    console.log(r);
      client.query('select * from holiday',function(err,r){
        if(err) console.log(err);
        if(r){
          console.log(r);
          client.query('select * from holiday',function(err,r){
            if(err) console.log(err);
            res.render('lending_holiday_delete',{data:r});
          });
        }
        else {
          console.log(r);
          client.query('select * from holiday',function(err,r){
            if(err) console.log(err);
              res.render('lending_holiday_delete',{data:r});
          });
        }
      });
  });
});

module.exports = router;
