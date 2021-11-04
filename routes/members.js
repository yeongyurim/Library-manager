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

// 이용자 검색

router.get('/serch', function(req, res, next){
  res.render('member_serch',{data:''});

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
  var params = [req.body.LIBRARAY_ID,req.body.SEC_PASSWORD,req.body.NAME,req.body.SEC_E_MAIL,req.body.SEC_MOBILE_PHONE1,
  req.body.SEC_MOBILE_PHONE2,req.body.SEC_MOBILE_PHONE3,req.body.MEMBERSHIP_FLAG,req.body.MEMBERSHIP_GROUP,req.body.MEMBERSHIP_LENDWEEK,
  req.body.REMARK,req.body.MEMBERSHIP_DELAY,req.body.DELETE_FLAG,req.body.FAMILY];

  for (i=0;i<params.length;i++) if(!params[i]) params[i] = "" ;

  params_name[0] = "LIBRARY_ID,SEC_PASSWORD,NAME,SEC_E_MAIL"
  params_name[1] = "SEC_MOBILE_PHONE1,SEC_MOBILE_PHONE2,SEC_MOBILE_PHONE3"
  params_name[2] = "MEMBERSHIP_FLAG,MEMBERSHIP_GROUP,MEMBERSHIP_LENDWEEK"
  params_name[3] = "REMARK,MEMBERSHIP_DELAY,DELETE_FLAG,FAMILY"

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

// 연체 이용자

router.get('/overdue', function(req, res, next){

    res.render('member_overdue');

});

router.post('overdue', function(req,res,next){

  res.render('member_overdue');
})

// 이용자 정보 수정


router.get('/modify', function(req, res, next){
  res.render('member_modify');
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
})

module.exports = router;
