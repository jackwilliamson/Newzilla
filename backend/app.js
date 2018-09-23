const api_keys_file = require('./config/api-key.json');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var NewsAPI = require('newsapi');
const news_client_instance = new NewsAPI(api_keys_file.news_api_key);
var cron = require("node-cron");
var cors = require('cors');
var request = require("request-promise");


var router = express.Router() // get an instance of the express Router

var app = express();

var server = require('http').Server(app)

var port = process.env.PORT || 8081 // set our port


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/';

var database;
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log(err);
    return;
  }
  database = db.db('newzilla');
  console.log("Connected to MongoDB");
});

function reply(res, response) {
  res.json(response)
}

router.get('/topics', (req, res) => {
  database.collection('topics').distinct('title', (err, data) => {
    if (err) {
      res.status(400);
      console.log(err);
      reply(res, {});
    } else {
      console.log(data);
      reply(res, data);
    }
  });
});

router.get('/articles', (req, res) => {

});

router.get('/update_topics', (req, res) => {
  console.log("refreshing local topics list from API");

  updateTopics();

  res.status(200);
  reply(res, { done: "done" });
});

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
});

function updateArticles(titles) {
  titles.forEach(title => {
    var options = {
      method: 'POST',
      url: 'https://news-api.lateral.io/documents/similar-to-text',
      headers:
      {
        'content-type': 'application/json',
        'subscription-key': api_keys_file.matching_api_key
      },
      body: { text: title },
      json: true
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
      database.collection('topics').updateOne(
        { topic: title }, // which entries to update
        { $set: {sources: body }},
        {}
      );
    });
  });
}

function updateTopics() {
  console.log("refreshing local topics list from API");

  news_client_instance.v2.topHeadlines({
    language: 'en',
    country: 'us'
  }).then(response => {
    response.articles.forEach(article => {
      database.collection('topics').updateOne(
        { topic: article.title }, // which entries to update
        { $setOnInsert: { first_seen_date: Date.now(), topic: article.title } }, // what to update with, $setOnInsert applies only on insert not update
        {
          upsert: true,
        }
      )
    })
    updateArticles(response.articles.map(article => { return article.title }));
  });
}

cron.schedule("*/15 * * * *", () => {
  updateTopics();
});

server.listen(port);
console.log('Server started on port ' + port);
