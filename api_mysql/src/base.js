const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'api',
  multipleStatements: true
});

mysqlConnection.connect(function (error) {
  if (error) {
    console.error(error);
    return;
  } else {
    console.log('LA BASE SE CONECTO');
  }
});

module.exports = mysqlConnection;
