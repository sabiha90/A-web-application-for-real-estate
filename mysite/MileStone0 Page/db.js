var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'real_estate'
});

connection.connect()
connection.query('SELECT * FROM pet;', function (err, rows) {
  if (err) throw err;

  console.log('The solution is: ', rows);
});
