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
  res.render('book');
});

// 자료 검색

router.get('/serch', function(req, res, next){

  client.query('select * from book',function(err,r){
    if(err) console.log(err);

    res.render('book_serch',{data:r});
    
  })

});

router.post('/serch', function(req, res, next){

  var paramName = req.body.Serch || req.query.Serch;

  client.query('select * from book where TITLE_OF_BOOK = ?',[paramName] ,function (e,r) {

    if (e) throw error ;

    if (r.length > 0) {

      res.render('book_serch', {data:r} );

    }
    else {
      res.render('book_serch',{data:''});
      console.log('검색결과가 없습니다.');
    }

  });
})

// 자료 등록

router.get('/register', function(req, res, next){

  res.render('book_register');

});

router.post('/register', function(req,res,next){

  var params_name = []
  var question_mark = ""
  var params = [req.body.RECORD_ID,req.body.ISBN_CODE,req.body.EXTRA_CODE,req.body.CLASS_ID
    ,req.body.WRITER_NAME1,req.body.WRITER_NAME2,req.body.WRITER_NAME3
    ,req.body.AUTHOR_NAME1,req.body.AUTHOR_NAME2,req.body.AUTHOR_NAME3
    ,req.body.TRANSLATOR_NAME,req.body.TRANSLATOR_NAME2
    ,req.body.TITLE_OF_BOOK,req.body.ORIGINAL_TITLE,req.body.ENGLISH_TITLE
    ,req.body.SECONDARY_TITLE,req.body.SERIES_TITLE
    ,req.body.ISSUE_COUNT,req.body.ISSUE_NATION,req.body.ISSUE_COMPANY
    ,req.body.TOTAL_PAGE,req.body.ILLUSTRATION,req.body.BOOK_SIZE,req.body.BOOK_PRICE
    ,req.body.THEME_WORD1,req.body.THEME_WORD2,req.body.THEME_WORD3,req.body.THEME_WORD4,req.body.THEME_WORD5]

    for (i=0;i<params.length;i++) if(!params[i]) params[i] = "" ;

    params_name[0] = "RECORD_ID,ISBN_CODE,EXTRA_CODE,CLASS_ID"
    params_name[1] = "WRITER_NAME1,WRITER_NAME2,WRITER_NAME3"
    params_name[2] = "AUTHOR_NAME1,AUTHOR_NAME2,AUTHOR_NAME3"
    params_name[3] = "TRANSLATOR_NAME,TRANSLATOR_NAME2"
    params_name[4] = "TITLE_OF_BOOK,ORIGINAL_TITLE,ENGLISH_TITLE"
    params_name[5] = "SECONDARY_TITLE,SERIES_TITLE"
    params_name[6] = "ISSUE_COUNT,ISSUE_NATION,ISSUE_COMPANY"
    params_name[7] = "TOTAL_PAGE,ILLUSTRATION,BOOK_SIZE,BOOK_PRICE"
    params_name[8] = "THEME_WORD1,THEME_WORD2,THEME_WORD3,THEME_WORD4,THEME_WORD5"

    for (i=0;i<params.length-1;i++){
      question_mark += "?,"
    }
    question_mark += "?"

    client.query('insert into book ('+params_name+') values ('+question_mark+')',
    params,function(err,r){
    if(err) console.log(err);

    console.log(r);
    res.render('book_register');

    });
});

// 자료 삭제

router.get('/delete', function(req, res, next){

  res.render('book_delete')

  });

router.post('/delete', function(req, res, next){

  var id = req.body.ID;

  client.query('delete from user where RECORD_ID = ?',
  [id],
  function(err,r){
    if(err) console.log(err);

    res.render('book_delete',{data:r});
  });
})

// 자료 수정


router.get('/modify', function(req, res, next){
  res.render('book_modify');
});

router.post('/modify', function(req, res, next){

  var params = [req.body.RECORD_ID,req.body.ISBN_CODE,req.body.EXTRA_CODE,req.body.CLASS_ID
    ,req.body.WRITER_NAME1,req.body.WRITER_NAME2,req.body.WRITER_NAME3
    ,req.body.AUTHOR_NAME1,req.body.AUTHOR_NAME2,req.body.AUTHOR_NAME3
    ,req.body.TRANSLATOR_NAME,req.body.TRANSLATOR_NAME2,req.body.TITLE_OF_BOOK
    ,req.body.ORIGINAL_TITLE,req.body.ENGLISH_TITLE,req.body.SECONDARY_TITLE
    ,req.body.SERIES_TITLE,req.body.ISSUE_COUNT,req.body.ISSUE_NATION
    ,req.body.ISSUE_COMPANY,req.body.TOTAL_PAGE,req.body.ILLUSTRATION
    ,req.body.BOOK_SIZE,req.body.BOOK_PRICE,req.body.THEME_WORD1
    ,req.body.THEME_WORD2,req.body.THEME_WORD3,req.body.THEME_WORD4,req.body.THEME_WORD5];

  var params_name = ["RECORD_ID","ISBN_CODE","EXTRA_CODE","CLASS_ID",
  "WRITER_NAME1","WRITER_NAME2","WRITER_NAME3","AUTHOR_NAME1","AUTHOR_NAME2",
  "AUTHOR_NAME3","TRANSLATOR_NAME","TRANSLATOR_NAME2","TITLE_OF_BOOK","ORIGINAL_TITLE",
  "ENGLISH_TITLE","SECONDARY_TITLE","SERIES_TITLE","ISSUE_COUNT","ISSUE_NATION",
  "ISSUE_COMPANY","TOTAL_PAGE","ILLUSTRATION","BOOK_SIZE","BOOK_PRICE",
  "THEME_WORD1","THEME_WORD2","THEME_WORD3","THEME_WORD4","THEME_WORD5"];

  var sql = "update book set "
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

  client.query(sql+" where RECORD_ID = ?",sql_params,function(err,r){
  if(err) console.log(err);

  console.log(r);
  res.render('member_modify');

  });
});



module.exports = router;
