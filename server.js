var request = require('request');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// /// TWIT ///
// var Twit = require('twit');
//
// var T = new Twit({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token: process.env.TWITTER_ACCESS_TOKEN,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// });
//
// var getTweets = function() {
//   T.get('statuses/user_timeline', { screen_name: 'hilliardsbeer', count: 3 }, function(err, data, response) {
//     console.log(data);
//   });
// };
//
// /// START SERVER ///
// app.listen(port, function() {
//   console.log('Express server started on port ' + port);

/// BreweryDB ///
var proxyBreweryLocation = function(req, res) {
  console.log('Routing BreweryDb request for', req.params[0]);
  var url = 'http://api.brewerydb.com/v2/brewery/' + req.params[0] + '/locations?' + process.env.BREWERYDB_TOKEN;
  request(url).pipe(res);
};

var proxyBreweryName = function(req, res) {
  var url = 'http://api.brewerydb.com/v2/brewery/' + req.params[0] + process.env.BREWERYDB_TOKEN;
  request(url).pipe(res);
};

/// ROUTES ///
app.use(express.static('./'));

// app.get('/twit', function(request, response) {
//   getTweets();
// });

app.get('/locations/*', proxyBreweryLocation);
app.get('/name/*', proxyBreweryName);

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

/// START SERVER ///
app.listen(port, function() {
  console.log('Express server started on port ' + port);
});
