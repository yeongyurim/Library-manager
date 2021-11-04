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

/*
  관리자 INDEX
*/

router.get('/', function(req, res, next) {

  res.render('user');

});

/*
  관리자 검색
*/

router.get('/serch', function(req, res, next){

  res.render('user_serch',{data:''});

});


router.post('/serch', function(req,res,next){

  var name = req.body.name;

  client.query('select * from user where KOREAN_NAME = ?',
    [name],
    function(err,r){

      if(err) console.log(err);

      res.render('user_serch',{data:r});

      console.log(r);
    });

});

/*
  관리자 등록
*/

router.get('/register', function(req, res, next){

  res.render('user_register');

});

router.post('/register', function(req, res, next){

  var params = [];
  params_name = [];
  question_mark = "";

  params[0] = req.body.id;
  params[1] = req.body.passwd;
  params[2] = req.body.kor_name;
  params[3] = req.body.eng_name;
  params[4] = req.body.residence_id;
  params[5] = req.body.birthday;
  params[6] = req.body.solar_lunar;
  params[7] = req.body.sex;
  params[8] = req.body.marriage;
  params[9] = req.body.home_num_1_1;
  params[10] = req.body.home_num_1_2;
  params[11] = req.body.home_num_1_3;
  params[12] = req.body.home_num_2_1;
  params[13] = req.body.home_num_2_2;
  params[14] = req.body.home_num_2_3;
  params[15] = req.body.phone_num_1;
  params[16] = req.body.phone_num_2;
  params[17]= req.body.phone_num_3;
  params[18] = req.body.zip_code;
  params[19] = req.body.home_address;
  params[20] = req.body.home_address_d;
  params[21] = req.body.email;
  params[22] = req.body.final_scholarship;
  params[23] = req.body.degree_sholarship;
  params[24] = req.body.gradation_date;
  params[25] = req.body.school_name;
  params[26] = req.body.academic_degree;
  params[27] = req.body.work;
  params[28] = req.body.work_name;
  params[29] = req.body.work_duty;
  params[30] = req.body.work_num_1;
  params[31] = req.body.work_num_2;
  params[32] = req.body.work_num_3;
  params[33] = req.body.work_num_ext;
  params[34] = req.body.direct_num_1;
  params[35] = req.body.direct_num_2;
  params[36] = req.body.direct_num_3;
  params[37] = req.body.direct_num_ext;
  params[38] = req.body.work_zipcode;
  params[39] = req.body.work_address;
  params[40] = req.body.work_address_d;

  for (i=0;i<params.length;i++) if(!params[i]) params[i] = '' ;

  params_name[0] = "UNION_ID,passwd,KOREAN_NAME,ENGLISH_NAME,SEC_RESIDENCE_ID1"
  params_name[1] = "BELIEVER_BIRTHDAY,SOLAR_LUNAR_FLAG,SEX,MARRIAGE_FLAG,SEC_HOME1_PHONE1,SEC_HOME1_PHONE2"
  params_name[2] = "SEC_HOME1_PHONE3,HOME2_PHONE1,HOME2_PHONE2,HOME2_PHONE3,SEC_MOBILE_PHONE1,SEC_MOBILE_PHONE2"
  params_name[3] = "SEC_MOBILE_PHONE3,ZIP_CODE,BELIEVER_ADDRESS1,BELIEVER_ADDRESS2,SEC_E_MAIL,FINAL_SCHOLARSHIP"
  params_name[4] = "DEGREE_SCHOLARSHIP,GRADATION_DATE,SCHOOL_NAME,ACADEMIC_DEGREE,WORK,WORK_NAME,WORK_DUTY"
  params_name[5] = "WORK_PHONE1,WORK_PHONE2,WORK_PHONE3,WORK_PHONE_EXT,DIRECT_PHONE1,DIRECT_PHONE2,DIRECT_PHONE3"
  params_name[6] = "DIRECT_PHONE_EXT,WORK_ZIP_CODE,WORK_ADDRESS1,WORK_ADDRESS2"
/*  params_name[7] = "PERSONAL_PHOTO_LOGICAL,PERSONAL_PHOTO_PHYSICAL,PASTOR_ID,EMPLOYEE_ID,LIBRARY_ID,BOOKSTORE_ID,BELIEVER_ID,NATION_NAME"
  params_name[8] = "DELETE_FLAG,INSERT_DATE,INSERT_USER_ID,UPDATE_DATE,UPDATE_USER_ID,VOLUNT_ID,RETIRE_PLANDATE"
  params_name[9] = "ZIP_CODE_OLD,PERSONAL_INFO_AGREE_DATE" */

  for (i=0;i<params.length-1;i++){
    question_mark += "?,"
  }
  question_mark += "?"

  client.query('insert into user ('+params_name+') values ('+question_mark+')',
  params,function(err,r){
  if(err) console.log(err);

  console.log(r);
  res.render('user_register');

  });


  /*
    관리자 정보 수정
  */


router.get('/modify', function(req, res, next){

  res.render('user_modify');

});

router.post('/modify', function(req,res,next){

  var params = [];
  var params_name = [];
  var sql = "update user set "
  var count = 0

  params[0] = req.body.id;
  params[1] = req.body.passwd;
  params[2] = req.body.kor_name;
  params[3] = req.body.eng_name;
  params[4] = req.body.residence_id;
  params[5] = req.body.birthday;
  params[6] = req.body.solar_lunar;
  params[7] = req.body.sex;
  params[8] = req.body.marriage;
  params[9] = req.body.home_num_1_1;
  params[10] = req.body.home_num_1_2;
  params[11] = req.body.home_num_1_3;
  params[12] = req.body.home_num_2_1;
  params[13] = req.body.home_num_2_2;
  params[14] = req.body.home_num_2_3;
  params[15] = req.body.phone_num_1;
  params[16] = req.body.phone_num_2;
  params[17]= req.body.phone_num_3;
  params[18] = req.body.zip_code;
  params[19] = req.body.home_address;
  params[20] = req.body.home_address_d;
  params[21] = req.body.email;
  params[22] = req.body.final_scholarship;
  params[23] = req.body.degree_sholarship;
  params[24] = req.body.gradation_date;
  params[25] = req.body.school_name;
  params[26] = req.body.academic_degree;
  params[27] = req.body.work;
  params[28] = req.body.work_name;
  params[29] = req.body.work_duty;
  params[30] = req.body.work_num_1;
  params[31] = req.body.work_num_2;
  params[32] = req.body.work_num_3;
  params[33] = req.body.work_num_ext;
  params[34] = req.body.direct_num_1;
  params[35] = req.body.direct_num_2;
  params[36] = req.body.direct_num_3;
  params[37] = req.body.direct_num_ext;
  params[38] = req.body.work_zipcode;
  params[39] = req.body.work_address;
  params[40] = req.body.work_address_d;

  params_name[0] = "UNION_ID"
  params_name[1] = "passwd"
  params_name[2] = "KOREAN_NAME"
  params_name[3] = "ENGLISH_NAME"
  params_name[4] = "SEC_RESIDENCE_ID1"
  params_name[5] = "BELIEVER_BIRTHDAY"
  params_name[6] = "SOLAR_LUNAR_FLAG"
  params_name[7] = "SEX"
  params_name[8] = "MARRIAGE_FLAG"
  params_name[9] = "SEC_HOME1_PHONE1"
  params_name[10] = "SEC_HOME1_PHONE2"
  params_name[11] = "SEC_HOME1_PHONE3"
  params_name[12] = "HOME2_PHONE1"
  params_name[13] = "HOME2_PHONE2"
  params_name[14] = "HOME2_PHONE3"
  params_name[15] = "SEC_MOBILE_PHONE1"
  params_name[16] = "SEC_MOBILE_PHONE2"
  params_name[17] = "SEC_MOBILE_PHONE3"
  params_name[18] = "ZIP_CODE"
  params_name[19] = "BELIEVER_ADDRESS1"
  params_name[20] = "BELIEVER_ADDRESS2"
  params_name[21] = "SEC_E_MAIL"
  params_name[22] = "FINAL_SCHOLARSHIP"
  params_name[23] = "DEGREE_SCHOLARSHIP"
  params_name[24] = "GRADATION_DATE"
  params_name[25] = "SCHOOL_NAME"
  params_name[26] = "ACADEMIC_DEGREE"
  params_name[27] = "WORK"
  params_name[28] = "WORK_NAME"
  params_name[29] = "WORK_DUTY"
  params_name[30] = "WORK_PHONE1"
  params_name[31] = "WORK_PHONE2"
  params_name[32] = "WORK_PHONE3"
  params_name[33] = "WORK_PHONE_EXT"
  params_name[34] = "DIRECT_PHONE1"
  params_name[35] = "DIRECT_PHONE2"
  params_name[36] = "DIRECT_PHONE3"
  params_name[37] = "DIRECT_PHONE_EXT"
  params_name[38] = "WORK_ZIP_CODE"
  params_name[39] = "WORK_ADDRESS1"
  params_name[40] = "WORK_ADDRESS2"

  for (i=0;i<params.length;i++){
    if(params[i]) {
      if(count==0){
        sql += params_name[i] + "= ?"
        count ++;
      }
      else {
        sql += ","+ params_name[i] + "= ?"
      }
    }
  }

  console.log(sql);

  });

});

/*
  관리자 삭제
*/

router.get('/delete', function(req,res,next){

  res.render('user_delete')

});

router.post('/delete', function(req, res, next){

  var id = req.body.ID;

  client.query('delete from user where UNION_ID = ?',
  [id],
  function(err,r){
    if(err) console.log(err);

    console.log(r)
    res.render('user_delete',{data:r});

  });
});


module.exports = router;
