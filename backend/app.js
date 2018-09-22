var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var news_api = require('news-api');
var cron = require("node-cron");


var router = express.Router() // get an instance of the express Router

var app = express();

var server = require('http').Server(app)

var port = process.env.PORT || 8081 // set our port


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

function reply(res, response) {
  res.json(JSON.stringify(response))
}

router.get('/topics', (req, res) => {
  res.status(200);
  reply(res, {test: "TEST"});
});

router.get('/articles', (req, res) => {

})

router.get('/', (req, res) => {
  res.status(200);
})

app.use('/', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

cron.schedule("*/15 * * * *", () => {
  console.log("refreshing local topics list from API");
});

server.listen(port);
console.log('Server started on port ' + port);
