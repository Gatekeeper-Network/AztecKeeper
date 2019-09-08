var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var TXSender=require('./createProof.js')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const serialRouter = require('./routes/serial');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//const serialStuff = require('./proofOverSerial')
//serial port router

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/users', usersRouter)
app.use(/serial/, serialRouter )

app.post('/Transfer', function(req, res) {
  console.log(req.body)
  var _from = req.body.from;
  var _to = req.body.to;
  var _InputAmount = req.body.InputAmount;
  var _TransferAmount= req.body.TransferAmount;
  console.log(_from)
  console.log(TXSender)
   TXSender.GenerateTransferTX(_from,_to,_InputAmount,_TransferAmount).then((r)=>{
    console.log(r)
    console.log('thosiajfoiejwoifj')
   })
  console.log(res)
});
app.post('/Relay', function(req, res) {
  let TXdata=req.body.TXdata
  res=TXdata
  console.log(res)
  return res
})



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
