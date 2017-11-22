var express = require('express');
var router = express.Router();
router.get('/login', function(req, res){
    var message = '';
  res.render('login',{message: message});
});
router.get('/signup', function(req, res){
    var message = '';
  res.render('signup',{message: message});
});



module.exports = router;


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'real_estate'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

router.post('/signup', function(req, res){
    var today = new Date();
    var users = {
      "user_name": req.body.user_name,
      "password": req.body.password,
      "first_name": req.body.first_name,
      "last_name": req.body.last_name,
      "mob_no":  req.body.mob_no
    }
 
      connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
});
});

