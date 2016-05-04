var request = require('request');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// /// Twit ///
// var Twit = require('twit');
//
// var T = new Twit({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   app_only_auth: true
// });
//
// var getTweets = function(req, res) {
//   T.get('statuses/user_timeline', {screen_name: req.params[0], count: 3})
//   .done(function(result) {
//     res.send(result.data);
//   });
// };

/// BreweryDB ///
var proxyBreweryLocation = function(req, res) {
  console.log('Routing BreweryDb request for', req.params[0], 'with key', process.env.BREWERYDB_TOKEN);
  var url = 'http://api.brewerydb.com/v2/brewery/' + req.params[0] + '/locations?key=' + process.env.BREWERYDB_TOKEN;
  request(url).pipe(res);
  console.log(res);
};

var proxyBreweryName = function(req, res) {
  var url = 'http://api.brewerydb.com/v2/brewery/' + req.params[0] + '?' + process.env.BREWERYDB_TOKEN;
  request(url).pipe(res);
};

/// Routes ///
app.use(express.static('./'));

// app.get('/twit/*', getTweets);

app.get('/locations/*', proxyBreweryLocation);
app.get('/name/*', proxyBreweryName);

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

/// Start Server ///
app.listen(port, function() {
  console.log('Express server started on port ' + port);
});
