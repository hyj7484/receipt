const mysql = require('./mysql');
const app = require('express')();
/*
    router Url =  /user/{}
*/
/*
  login router
  post
  req data = userId, userPw
*/


app.post('/login', (req, res) => {
  const id = req.body.userId || "";
  const pw = req.body.userPw || "";
  const query = `select * from user where userId = '${id}' and userPw = '${pw}'`;
  if(id == "" || pw == ""){
    res.json(false);
  }
  mysql.query(query, (err, rows)=> {
    if(err) throw err;
    res.json(rows[0] != null ? rows[0] : false );
  })
});
/*
  Sign in router
  post
  req data = userId, userPw, userName
*/
app.post('/sign', (req, res) => {
  const id    = req.body.userId || "";
  const pw    = req.body.userPw || "";
  const name  = req.body.userName || "";
  const selectQuery = `select * from user where userId = '${id}'`;
  const insertQuery = `insert into user(userid, userpw, username) values('${id}', '${pw}', '${name}')`

  if(id == "" || pw == "" || name == ""){
    res.json(false);
  }
  mysql.query(selectQuery, (err, rows) => {
    if(err) throw err;
    if(rows.length == 0) {
      mysql.query(insertQuery, (err, rows) => {
        if(err) throw err;
        res.json(true);
      })
    }else{
      res.json(false)
    }
  })
});

module.exports = app;
