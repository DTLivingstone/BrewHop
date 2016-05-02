'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

///////////////
app.get('/*', function(req, res){
  res.send('Hello World');
});
///////////////

var Twit = require('twit');

var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

T.post('statuses/update', { status: 'Hello from twit, a Twitter client for node.js' }, function(err, data, response) {
  console.log(data);
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
