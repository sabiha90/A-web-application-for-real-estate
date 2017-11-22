var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'sfsuse.com',
  user     : 'sbarlaskar',
  password : '917932501',
  database : 'sbarlaskar',
  timeout: 60000
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

//connection.query('SELECT * FROM property_details;', function (err, rows) {
//  if (err) throw err;

//  console.log('The solution is: ', rows);
//});
