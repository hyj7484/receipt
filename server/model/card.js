const mysql = require('./mysql');
const app = require('express')();

/*
  cardName, userNumber
*/
app.post('/getCardList', (req, res) => {
  const userNumber = req.body.userNumber || "";
  const selectQuery = `select cardId, cardName from card where userNumber = '${userNumber}'`;

  mysql.query(selectQuery, (err, rows) => {
    if(err) throw err;
    res.json(rows);
  })
});

app.post('/add', (req, res) => {
  const userNumber  = req.body.userNumber || "";
  const cardName    = req.body.cardName || "";
  const insertQuery = `insert into card (cardName, userNumber) values('${cardName}', '${userNumber}')`;

  mysql.query(insertQuery, (err, rows) => {
    if(err) throw err;
    res.json(true);
  })
});

app.post('/delete', (req, res) => {
  const userNumber = req.body.userNumber || "";
  const cardId = req.body.cardId || "";

})

module.exports = app;
