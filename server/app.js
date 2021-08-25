const app = require('express')();
const user = require('./model/user');
const card = require('./model/card');
const payMoney = require('./model/payMoney');

app.use('/user', user);
app.use('/card', card);
app.use('/paymoney', payMoney);

module.exports = app;
