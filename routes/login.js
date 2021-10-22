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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res) {

  var paramID = req.body.id || req.query.id;
  var pw = req.body.passwd || req.query.passwd;

  client.query('select * from user where union_id = ? and passwd = ?',[paramID,pw] ,function (e,r) {
    if (e) throw error ;
    if (r.length > 0) {
      req.session.user = r[0].KOREAN_NAME;
      req.session.id = r[0].UNION_ID;
      console.log();
      res.redirect('/')
    }
    else {
      console.log('비밀번호가 올바르지 않습니다.')
    }
  });
});

module.exports = router;