'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

/// ROUTES ///
app.use(express.static('./'));

app.get('/twit', function(request, response) {
  getTweets();
});

app.get('*', function(request, response) {
  response.sendFile('index.html', { root: '.' });
});

/// TWIT ///
var Twit = require('twit');

var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var getTweets = function() {
  T.get('statuses/user_timeline', { screen_name: 'hilliardsbeer', count: 3 }, function(err, data, response) {
    console.log(data);
  });
};

/// START SERVER ///
app.listen(port, function() {
  console.log('Express server started on port ' + port);
});
