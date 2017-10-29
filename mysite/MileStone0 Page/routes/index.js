var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('home', { title: 'About me' });
//});
router.get('/', function(req, res, next) {
  res.render('shoppingcart', { title: 'Shopping cart' });
});

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
module.exports = router;
