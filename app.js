var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const http =require ('http');
const database =require('./database/dbexam.json');
const mongoose =require('mongoose');
const produitsRouter =require('./routes/produits');

var app = express();
mongoose.connect(
  database.mongo.url,
  {useNewUrlParser:true,useUnifiedTopology:true}
).then(() =>{
  console.log("connection to database");

}).catch(()=>{
  console.log("connection failed")
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/produits',produitsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

const server = http.createServer(app);
server.listen(3000,() =>{
  console.log("server starter on port 3000")
});