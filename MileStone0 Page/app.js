var express = require('express');
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}


var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var index = require('./routes/ind1');
var users = require('./routes/users');
var stylus = require('stylus');
var nib = require('nib');
var session = require('express-session');
var fileUpload = require('express-fileupload');
var fs = require('fs');
//var formidable = require('formidable');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(stylus.middleware(
                     {
                     src: __dirname + '/public'
                    , compile: compile
                    }));
    app.use(express.static(__dirname + '/public'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.set('trust proxy', 1);
app.use(session({
                    name: 'session'
                   // , secret: "randomstring.generate()"
                    , secret: "ssshhhshh"
                    , httpOnly: true
                    , maxAge: 30 * 60 * 1000
                    , secure: false
                    , overwrite: false,
                    resave: false,
                    saveUninitialized: true
              }));
app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('S3CRE7'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
