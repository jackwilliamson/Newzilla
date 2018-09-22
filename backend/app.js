const api_keys_file = require('./config/api-key.json');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var NewsAPI = require('newsapi');
const news_client_instance = new NewsAPI(api_keys_file.news_api_key);
var cron = require("node-cron");


var router = express.Router() // get an instance of the express Router

var app = express();

var server = require('http').Server(app)

var port = process.env.PORT || 8081 // set our port


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/';

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log(err);
    return;
  }
  var database = db.db('newzilla');
  database.collection('topics').insertOne({'fadfa': 'test'  }, (err, res) => {
    if (err) throw err;
    console.log("Inserted");
  });

  var cursor = database.collection('topics').find();

  cursor.forEach(function (doc) {
    console.log(doc);
  });
});


function reply(res, response) {
  res.json(JSON.stringify(response))
}

router.get('/topics', (req, res) => {
  res.status(200);
  reply(res, { test: "TEST" });
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

  news_client_instance.v2.topHeadlines({
    language: 'en',
    country: 'us'
  }).then(response => {
    console.log(response);

    // update DB here
  });
});

server.listen(port);
console.log('Server started on port ' + port);
