var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');

/* GET home page. */


router.get('/search', function(req, res, next) {
  res.render('search', { title: 'Search bar' });
});



router.get('/add_details', function(req, res, next) {
  var message = '';
  res.render('add_details', { message:message });
});



router.get('/login', function(req, res){
    var message = '';
  res.render('login',{message: message});
});
router.get('/signup', function(req, res){
    var message = '';
  res.render('signup',{message: message});
});

//router.get('/profile', function(req, res, next) {
 // res.render('profile', { title: 'About me' });
//});

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

router.post('/login', function(req,res){
  var user_name= req.body.user_name;
  var password = req.body.password;
  var sess = req.session;
  var person;
  connection.query('SELECT * FROM users WHERE user_name = ?',user_name, function (error, results, fields) {
  console.log('this.sql', this.sql);
  if(error)
  {
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  } else
  {
    console.log('The solution is: ', results[0].password);
    if(results.length >0){
      if(results[0].password == password)
      {
        sess.response = "Account Matches"
        res.render('profile',{"person": results});
        
      }
      else{
        res.send({
          "code":204,
          "success":"Username and password does not match"
            });
      }

    }
    else{
      res.send({
        "code":204,
        "success":"Username does not exist"
          });
    }
  }
    
 
  });
});

router.post('/search', function(req, res)
{

  var rows;
  var zipcode= req.body.zipcode;
  connection.query("SELECT * FROM `house_listing` WHERE `zipcode` LIKE ?", '%' + req.body.search + '%',  function (error, results, fields) {
  console.log('this.sql', this.sql);
 
  if(error)
  {
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }
  else if(results.length<6)
  {
    
    console.log('The solution is: ', results);
    res.render('search_results',{"rows":results});
  }
  else
  {
    res.send({

      "code": 400,
      "failed":"Sorry Not Found!"
    });
  }
    
});




});

router.post('/add_details', function(req, res){
    var today = new Date();
    
    var details = {
      "property_type": req.body.property_type,
      "zipcode": req.body.zipcode,
      "city": req.body.city,
      "state": req.body.state,
      "country": req.body.country,
      "price": req.body.price

    }

 
 connection.query('INSERT INTO `house_listing` SET ?',details, function (error, results, fields) {
  console.log('this.sql', this.sql);
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
      "success":"details entered sucessfully"
        });
  }
});
});
module.exports = router;


