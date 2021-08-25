const mysql = require('mysql');
const connection = mysql.createConnection({
  host : '3.138.143.93',
  user : 'dbconnect',
  password : 'dydwn159',
  database : 'myreceipt',
});

connection.connect();

module.exports = connection;
