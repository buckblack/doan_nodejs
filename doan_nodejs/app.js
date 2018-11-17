var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tiviRouter = require('./routes/tivi');
var chitietRouter = require('./routes/chitiet');
var dk_dnRouter = require('./routes/dangky_dangnhap');
var aboutRouter = require('./routes/about');
var errorRouter = require('./routes/error');
var giohangRouter = require('./routes/giohang');
var tulanhRouter=require('./routes/tulanh');
var maylanhRouter=require('./routes/maylanh');
var userRouter=require('./routes/users');
var timkiemRouter=require('./routes/timkiem');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')))


app.use('/', indexRouter);
app.use('/users/', usersRouter);
app.use('/tivi/', tiviRouter);
app.use('/chitiet/', chitietRouter);
app.use('/', dk_dnRouter);
app.use('/', aboutRouter);
app.use('/', errorRouter);
app.use('/', giohangRouter);
app.use('/tulanh/',tulanhRouter);
app.use('/maylanh',maylanhRouter);
app.use('/users',userRouter);
app.use('/tim-kiem',timkiemRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
  res.render('404', { tieude: 'Lỗi 404',trangthai:"Lỗi 404" });
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
