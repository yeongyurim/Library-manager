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

function sql_parsing () {

}

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('member');
});

function zeroAdder(a) {
  if(a<10) a = '0'+a
  a = '' + a;
  return a;
}

// 이용자 검색

router.get('/serch', function(req, res, next){

  client.query('select * from member',function(err,r){
    if(err) console.log(err);

    res.render('member_serch',{data:r});
  });

});

router.post('/serch', function(req, res, next){

  var paramName = req.body.Serch || req.query.Serch;

  client.query('select * from member where NAME = ?',[paramName] ,function (e,r) {

    if (e) throw error ;

    if (r.length > 0) {

      res.render('member_serch', {data: r } );

    }
    else {
      res.render('member_serch',{data:''});
      console.log('검색결과가 없습니다.')
    }

  });
});
// 이용자 등록

router.get('/register', function(req, res, next){
  res.render('member_register',{ msg:'kk' });
});

router.post('/register', function(req, res, next){

  var params_name = []
  var question_mark = ""
  var params = [req.body.LIBRARY_ID,req.body.SEC_PASSWORD,req.body.NAME,req.body.SEC_E_MAIL,req.body.SEC_MOBILE_PHONE1,
  req.body.SEC_MOBILE_PHONE2,req.body.SEC_MOBILE_PHONE3,req.body.MEMBERSHIP_FLAG,req.body.MEMBERSHIP_GROUP,req.body.MEMBERSHIP_LENDWEEK,
  req.body.REMARK,req.body.MEMBERSHIP_DELAY,req.body.DELETE_FLAG,req.body.FAMILY];

  for (i=0;i<params.length;i++) if(!params[i]) params[i] = "" ;

  params_name[0] = "LIBRARY_ID,SEC_PASSWORD,NAME,SEC_E_MAIL"
  params_name[1] = "SEC_MOBILE_PHONE1,SEC_MOBILE_PHONE2,SEC_MOBILE_PHONE3"
  params_name[2] = "MEMBERSHIP_FLAG,MEMBERSHIP_GROUP,MEMBERSHIP_LENDWEEK"
  params_name[3] = "REMARK,MEMBERSHIP_DELAY,DELETE_FLAG,FAMILY"

    console.log(params_name,params);

  for (i=0;i<params.length-1;i++){
    question_mark += "?,"
  }
  question_mark += "?"

  client.query('insert into member ('+params_name+') values ('+question_mark+')',
  params,function(err,r){
  if(err) console.log(err);

  console.log(r);
  res.render('member_register');

  });

});

/*
  관리자 정보 수정
*/


router.get('/modify', function(req, res, next){

  res.render('member_modify');

});

router.post('/modify', function(req,res,next){

  var params = [req.body.LIBRARY_ID,req.body.SEC_PASSWORD,req.body.NAME,req.body.SEC_E_MAIL,req.body.SEC_MOBILE_PHONE1,
  req.body.SEC_MOBILE_PHONE2,req.body.SEC_MOBILE_PHONE3,req.body.MEMBERSHIP_FLAG,req.body.MEMBERSHIP_GROUP,req.body.MEMBERSHIP_LENDWEEK,
  req.body.REMARK,req.body.MEMBERSHIP_DELAY,req.body.DELETE_FLAG,req.body.FAMILY];

  var params_name = ["LIBRARY_ID","SEC_PASSWORD","NAME","SEC_E_MAIL","SEC_MOBILE_PHONE1",
  "SEC_MOBILE_PHONE2","SEC_MOBILE_PHONE3","MEMBERSHIP_FLAG","MEMBERSHIP_GROUP","MEMBERSHIP_LENDWEEK",
  "REMARK","MEMBERSHIP_DELAY","DELETE_FLAG","FAMILY"];

  var sql = "update member set "
  var sql_params = [];
  var count = 0

  console.log(params_name,params);

  for (i=0;i<params.length;i++){
    if(params[i]) {
      sql_params.push(params[i]);
      if(count==0) {
        sql += params_name[i] + "= ?"
        count ++;
      }
      else {
        sql += ","+ params_name[i] + "= ?"
      }
    }
  }

  sql_params.push(params[0]);

  client.query(sql+" where LIBRARY_ID = ?",sql_params,function(err,r){
  if(err) console.log(err);

  console.log(r);
  res.render('member_modify');

  });

});



// 이용자 삭제

router.get('/delete', function(req, res, next){
  res.render('member_delete');
});

router.post('/delete', function(req, res, next){

  var id = req.body.ID;

  client.query('delete from member where LIBRARY_ID = ?',
  [id],
  function(err,r){
    if(err) console.log(err);

    res.render('member_delete',{data:r});
  });
});

// 연체회원 관리

router.get('/overdue', function(req, res, next){
  var today = new Date();
  var today_MD = zeroAdder(today.getMonth()+1)+zeroAdder(today.getDate());
  var today = today.getFullYear() + today_MD;
  var overdue = []
  var dup = '';
  var abc = '';
  client.query('select * from lending where ? > EXPECT_RETURN_DATE and RETURN_DATE is NULL',[today],
  function(err,r){
    if(err) console.log(err);
    for(var i=0; i<r.length; i++){
      client.query('select * from member where LIBRARY_ID = ?',[r[i].LIBRARY_ID],
      function(err,t){
        console.log(i);
        if(dup!=abc) {
          overdue.push(t);
          console.log(abc);
        }
        dup = abc;
        if(err) console.log(err);
        if(i==r.length){
        };
      });
    };
  });
});

module.exports = router;
