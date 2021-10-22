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
  arr = []
  res.render('member_serch', { name : arr } );

});

router.post('/serch', function(req, res, next){

  var paramName = req.body.Serch || req.query.Serch;

  client.query('select * from member where name = ?',[paramName] ,function (e,r) {

    if (e) throw error ;

    if (r.length > 0) {

      res.render('member_serch', { name : r } );

    }
    else {
      console.log('검색결과가 없습니다.')
    }

  });
});
// 이용자 등록

router.get('/register', function(req, res, next){
  res.render('member_register',{ msg:'kk' });
});

router.post('/register', function(req, res, next){

  var id = req.body.id;
  var passwd = req.body.passwd;
  var kor_name = req.body.kor_name;
  var eng_name = req.body.eng_name;
  var residence_id = req.body.residence_id;
  var birthday = req.body.birthday;
  var solar_lunar = req.body.solar_lunar;
  var sex = req.body.sex;
  var marriage = req.body.marriage;
  var home_num_1_1 = req.body.home_num_1_1;
  var home_num_1_2 = req.body.home_num_1_2;
  var home_num_1_3 = req.body.home_num_1_3;
  var home_num_2_1 = req.body.home_num_2_1;
  var home_num_2_2 = req.body.home_num_2_2;
  var home_num_2_3 = req.body.home_num_2_3;
  var phone_num = req.body.phone_num;
  var zip_code = req.body.zip_code;
  var home_address = req.body.home_address;
  var home_address_d = req.body.home_address_d;
  var email = req.body.email
  var final_scholarship = req.body.final_scholarship;
  var degree_sholarship = req.body.degree_sholarship;
  var gradation_date = req.body.gradation_date;
  var school_name = req.body.school_name;
  var academic_degree = req.body.academic_degree;
  var work = req.body.work;
  var work_name = req.body.work_name;
  var work_duty = req.body.work_duty;
  var work_num_1 = req.body.work_num_1;
  var work_num_2 = req.body.work_num_2;
  var work_num_3 = req.body.work_num_3;
  var work_num_ext = req.body.work_num_ext;
  var direct_num_1 = req.body.direct_num_1;
  var direct_num_2 = req.body.direct_num_2;
  var direct_num_3 = req.body.direct_num_3;
  var work_zipcode = req.body.zip_code;
  var work_address = req.body.work_address;


    client.query('insert into user (LIBRARY_ID,passwd,name,email,phone_num) values (?,?,?,?,?)',
  [id,passwd,name,email,pn],function(err,r){
    if(err) console.log(err);

    console.log(r);
    res.render('member_register',{msg:r});

});

});

// 연체 이용자

router.get('/overdue', function(req, res, next){

  client.query('select * from user where name = ?',[paramName] ,function (e,r) {

    if (e) throw error ;

    if (r.length > 0) {

      res.render('member_serch', { name : r } );

    }
    else {
      console.log('검색결과가 없습니다.')
    }

  });

});

router.post('')

// 이용자 정보 수정


router.get('/modify', function(req, res, next){
  res.render('member_modify');
});

// 이용자 삭제

router.get('/delete', function(req, res, next){
  res.render('member_delete');
});

module.exports = router;
