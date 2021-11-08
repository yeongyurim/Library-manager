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

  if(req.session.user){
    user = req.session.user;
    res.render('index',{ name : user });
  }
  else if(req.session.member){
    var member = req.session.member;
    var LIBRARY_ID   = req.session.LIBRARY_ID;
    var data = [];

    client.query('select * from lending where LIBRARY_ID = ? and RETURN_DATE is NULL',[LIBRARY_ID],
    function(err,r){
      if(err) console.log(err);
      for(i=0;i<r.length;i++){
        client.query('select * from book where RECORD_ID = ?',[r[i].RECORD_ID],
        function(err,t){
          if(err) console.log(err);
          data.push(t[0].TITLE_OF_BOOK);
          if(i==(r.length)){
            res.render('members_index',{name:member,data:data})
          }
        });
      }
    });
  }
  else{
    res.redirect('/login')
  }
});

module.exports = router;
