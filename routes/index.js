var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('search', { title: 'Search bar' });
});


/*router.get('/', function(req, res, next) {
  res.render('home', { title: 'About me' });
});*/

router.get('/index', function(req,res,next){
  res.render('index',{ title: 'Home'});
});

router.get('/risha', function(req,res,next){
  res.render('risha',{ title: 'Risha'});
});

router.get('/jeremy', function(req,res,next){
  res.render('jeremy',{ title: 'jeremy'});
});

router.get('/kachi', function(req,res,next){
  res.render('kachi',{ title: 'Kachi'});
});
router.get('/parker', function(req,res,next){
  res.render('parker',{ title: 'Kachi'});
});

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'About me' });
});


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
  host     : '127.0.0.1',
  user     : 'fa17g13',
  password : 'csc648fa17g13',
  database : 'fa17g13'
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
  var city = req.body.city;
  var street = req.body.street;
  if(zipcode)
  {
  connection.query("SELECT * FROM `property_details` WHERE `zipcode` LIKE ? ORDER BY `price`  ", '%' + zipcode + '%', function (error, results, fields) {
  console.log('this.sql', this.sql);
 
  //if(error)
 // {
  //  res.send({
  //    "code":400,
  //    "failed":"error ocurred"
  //  })
 // }
  if(results.length == 0)
  {
    res.render('search_results',{"rows": "Sorry Not Found!"});
  }
  else if(results.length<6)
  {
    
    console.log('The solution is: ', results);
    res.render('search_results',{"rows":results});
  }
    
});
}
if(city)
  {
  connection.query("SELECT * FROM `property_details` WHERE `city` LIKE ? ORDER BY `price`  ", '%' + city + '%', function (error, results, fields) {
  console.log('this.sql', this.sql);

  //if(error)
 // {
  //  res.send({
  //    "code":400,
  //    "failed":"error ocurred"
  //  })
 // }
  if(results.length == 0)
  {
    res.render('search_results',{"rows": "Sorry Not Found!"});
  }
  else if(results.length<6)
  {

    console.log('The solution is: ', results);
    res.render('search_results',{"rows":results});
  }
});
}
if(street)
  {
  connection.query("SELECT * FROM `property_details` WHERE `street` LIKE ? ORDER BY `price`  ", '%' + street + '%', function (error, results, fields) {
  console.log('this.sql', this.sql);

  //if(error)
 // {
  //  res.send({
  //    "code":400,
  //    "failed":"error ocurred"
  //  })
 // }
  if(results.length == 0)
  {
    res.render('search_results',{"rows": "Sorry Not Found!"});
  }
  else if(results.length<6)
  {

    console.log('The solution is: ', results);
    res.render('search_results',{"rows":results});
  }
});
}

});

router.post('/add_details', function(req, res){

  var details = {
      "square_size": req.body.square_size,
      "number_of_bedrooms": req.body.number_of_bedrooms,
      "no_baths": req.body.no_baths,
      "lot_size": req.body.lot_size,
      "year_of_construction": req.body.year_of_construction,
      "property_type": req.body.property_type,
      "house_number": req.body.house_number,
      "street": req.body.street,
      "zipcode": req.body.zipcode,
      "city": req.body.city,
      "state": req.body.state,
      "country": req.body.country,
      "price": req.body.price,
      "image": req.body.image
    }
//console.log(req.file.image.name);
 
 connection.query('INSERT INTO `property_details` SET ?',details, function (error, results, fields) {
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
