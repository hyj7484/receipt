const mysql = require('./mysql');
const app = require('express')();


app.post('/add', (req, res) => {
  const cardId   = req.body.cardId   || "";
  const payMoney = req.body.payMoney || "";
  const content  = req.body.content  || "";
  const date     = req.body.date     || "";
  const installment = req.body.installment || 1;

  const insertQuery =
  `insert into payMoney (cardId, payMoney, content, date, installment)
  values('${cardId}', '${payMoney}', '${content}', '${date}', ${installment})`;

  mysql.query(insertQuery, (err, rows) => {
    if(err) throw err;
    res.json(true);
  })
});


app.post('/getMoneyList', (req, res) => {
  const cardId   = req.body.cardId  || "";
  const year     = req.body.year  || "";
  const month    = req.body.month || "";

  const lastDate = new Date(year, month, 0).getDate();
  if(cardId == "" || year == "" || month == ""){
    res.json(false);
    return;
  }

  const selectQuery = `select * from payMoney where cardId = '${cardId}' and date >= '${year}-${month}-01' and date <= '${year}-${month}-${lastDate}' order by date asc`;

  mysql.query(selectQuery, (err, rows) => {
    if(err) throw err;
    res.json(rows);
  })
});


app.post('/delete', (req, res) => {

});

app.post('/update', (req, res) => {

});

module.exports = app;
