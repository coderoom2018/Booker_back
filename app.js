var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');

var sequelize = require('./models').sequelize;


var app = express();

app.use(cors());

sequelize.sync();

var index = require('./routes/index');
app.use('/index', index);

var mypage = require('./routes/mypage');
app.use('/mypage', mypage);

var book = require('./routes/book');
app.use('/book', book);

var review = require('./routes/review');
app.use('/review', review);

var bookmark = require('./routes/bookmark');
app.use('/bookmark', bookmark);

var user = require('./routes/user');
app.use('/user', user);

var focus = require('./routes/focus');
app.use('/focus', focus);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
