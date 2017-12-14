var express = require('express');
var passwordHash = require('password-hash');

var router = express.Router();
var fs = require('fs');



router.get('/homepage', function(req, res, next) {
  console.log(req.session.id);
  connection.query('select * from property_details LIMIT 4', function (error, results, fields){
  console.log('this.sql',this.sql);    
  if(error)
          {
            console.log("error ocurred",error);
            res.send({
            "code":400,
            "failed":"error ocurred"
          });
        }
        else{
          res.render('homepage',{"rows":results});
        }
        
});
        
});

router.get('/search', function(req, res, next) {
  res.render('search', { title: 'Search bar' });
});
router.get('/add_details', function(req, res, next) {
  var id = req.query.id;
  var results = '';

  res.render('add_details', { "results":id });
  console.log(results);
});

router.get('/login', function(req, res){
    var message = '';
  res.render('login',{message: message});
});

router.get('/resultPage', function(req, res){
    var message = '';
  res.render('resultPage',{message: message});
});
router.get('/signup', function(req, res){
    var message = '';
  res.render('signup',{message: message});
});
router.get('/message', function(req, res){
    var message = '';
  res.render('message',{message: message});
});
router.get('/map', function(req, res){
    var message = '';
  res.render('map',{message: message});
});

router.get('/sample', function(req, res, next) {
  res.render('sample', { title: ' Sample' });
});

router.get('/header1', function(req, res, next) {
  res.render('header1', { title: ' Header' });
});

router.get('/footer', function(req, res, next) {
  res.render('footer', { title: ' Footer' });
});
router.get('/seller_header', function(req, res, next) {
  res.render('seller_header', { title: 'Search bar' });
});


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password1',
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
      "password": passwordHash.generate(req.body.password),
      "first_name": req.body.first_name,
      "last_name": req.body.last_name,
      "mob_no":  req.body.mob_no
    }

 
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
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
      "success":"user registered sucessfully"
        });
  }
});
});

router.post('/login', function(req,res){
  req.session.user_name = req.body.user_name;
  req.session.password = req.body.password;
  var user_name = req.session.user_name;
  var password = req.session.password;
  

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
        
        //console.log(results[0].user_name);
        req.session.results = results
        console.log('session',req.session.id);
       
        res.render('profile',{"person": req.session.results});
        
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


router.post('/message', function(req,res){
  var message = {
  "bname": req.body.bname,
  "bemail": req.body.bemail,
  "vphone": req.body.vphone,
  "messages": req.body.messages,
  "listing_ID": req.query.id
};
  console.log(message);
  connection.query('INSERT INTO `message_tab` SET ?',message, function (error, results, fields) {
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
      "success":"Your message has been sent"
        });
  }
});
});

router.get('/message_details', function(req,res){
  var id = req.query.id;
  connection.query('select m.messages,m.bname,m.bemail,m.vphone from message_tab m JOIN property_details p ON m.listing_ID = p.id JOIN users u ON p.user_id = u.id WHERE p.user_id = ? ', id, function (message_error, message_results, message_fields){
  console.log('this.sql',this.sql);    
        if(message_error)
          {
            console.log("error ocurred",message_error);
            res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }
        else{
          res.render('message_details',{"rows":message_results});
        }
        
      });
});







router.post('/search', function(req, res)
{

  var rows;
  
  var zipcode = req.body.zipcode;
  var city = req.body.city;
  var street = req.body.street;

  if(zipcode)
  {

    connection.query("SELECT * FROM `property_details` WHERE `zipcode` LIKE ? ", '%' + zipcode + '%', function (error, results, fields) {
    console.log('this.sql', this.sql);
    console.log('this.sql', results.length);
    if(results.length == 0)
    {
       res.send({"rows": "Sorry Not FOund!"});
    //res.send({
     // "code":400,
      //"failed":"error ocurred"
    //})
    }
   else if(results.length<6)
   {
    
      console.log('The solution is: ', results);
      res.render('search_results',{"rows":results});
   }
   else
   {
     res.render('search_results',{"message": req.flash("Sorry Not FOund!")});
    //res.send({

      //"code": 400,
      //"failed":"Sorry Not Found!"
    //});
   }
    
});
  }

 if(city)
  {
    connection.query("SELECT * FROM `property_details` WHERE `city` LIKE ? ", '%' + city + '%', function (error, results, fields) {
    console.log('this.sql', this.sql);
    console.log('this.sql', results.length);
    if(results.length == 0)
    {
       res.send({"rows": "Sorry Not FOund!"});
    //res.send({
     // "code":400,
      //"failed":"error ocurred"
    //})
    }
   else if(results.length<6)
   {
    
      console.log('The solution is: ', results);
      res.render('search_results',{"rows":results});
   }
   else
   {
     res.render('search_results',{"message": req.flash("Sorry Not FOund!")});
    //res.send({

      //"code": 400,
      //"failed":"Sorry Not Found!"
    //});
   }
    
});

  }

  if(street)
  {
     connection.query("SELECT * FROM `property_details` WHERE `street` LIKE ? ", '%' + street + '%', function (error, results, fields) {
    console.log('this.sql', this.sql);
    console.log('this.sql', results.length);
    if(results.length == 0)
    {
       res.send({"rows": "Sorry Not FOund!"});
    //res.send({
     // "code":400,
      //"failed":"error ocurred"
    //})
    }
   else if(results.length<6)
   {
    
      console.log('The solution is: ', results);
      res.render('search_results',{"rows":results});
   }
   else
   {
     res.render('search_results',{"message": req.flash("Sorry Not FOund!")});
    //res.send({

      //"code": 400,
      //"failed":"Sorry Not Found!"
    //});
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
      "image": req.body.image,
      "user_id": req.query.id
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




router.get('/home_search_results', function(req,res){
  var id = req.query.id;
  connection.query("SELECT * FROM `property_details` WHERE `id`= ?", id, function (error, results, fields) {
  console.log('this.sql',this.sql);    
        if(error)
          {
            console.log("error ocurred",error);
            res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }
        else{
          res.render('home_search_results',{"rows":results});
        }
        
      });
});


router.get('/options', function(req,res){
  var id = req.query.id;
  connection.query("SELECT * FROM `property_details` WHERE `user_id`= ?", id, function (error, results, fields) {
  console.log('this.sql',this.sql);    
        if(error)
          {
            console.log("error ocurred",error);
            res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }
        else{
          res.render('edit_page_results',{"rows":results});
        }
        
      });
});

router.get('/sort', function(req,res){
  var val = req.query.q;
  var city = req.query.city;
  if (val=='price')
  {
    connection.query("SELECT * FROM `property_details` WHERE `city`= ? ORDER BY price ASC ", city, function (error, results, fields) {
    console.log('this.sql',this.sql); 
    if(error)
          {
            console.log("error ocurred",error);
            res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }
        else{
          //res.render('search_results',{"rows":results});
          res.send({"rows":results});
        }
  });   
  
  }

  if (val=='number_of_bedrooms')
  {
    connection.query("SELECT * FROM `property_details` WHERE `city`= ? ORDER BY number_of_bedrooms ASC ", city, function (error, results, fields) {
    console.log('this.sql',this.sql); 
    if(error)
          {
            console.log("error ocurred",error);
            res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }
        else{
          res.send({"rows":results});
        }
  });
  }
  if (val=='square_size')
  {
    connection.query("SELECT * FROM `property_details` WHERE `city`= ? ORDER BY square_size ASC ", city, function (error, results, fields) {
    console.log('this.sql',this.sql); 
    if(error)
          {
            console.log("error ocurred",error);
            res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }
        else{
          res.send({"rows":results});
        }
  });
  }      
});

router.get('/homepage_details', function(req,res){
  var id = req.query.id;
  connection.query('select * from property_details  ', function (message_error, message_results, message_fields){
  console.log('this.sql',this.sql);    
        if(message_error)
          {
            console.log("error ocurred",message_error);
            res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }
        else{
          res.render('homepage',{"rows":message_results});
        }
        
      });
});


   
module.exports = router;


