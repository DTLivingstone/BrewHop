var request = require('request');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

/// BreweryDB ///
var proxyBreweryLocation = function(req, res) {
  var url = 'http://api.brewerydb.com/v2/brewery/' + req.params[0] + '/locations?key=' + process.env.BREWERYDB_TOKEN;
  console.log(url);
  request(url).pipe(res);
};

var proxyBreweryName = function(req, res) {
  var url = 'http://api.brewerydb.com/v2/brewery/' + req.params[0] + '?key=' + process.env.BREWERYDB_TOKEN;
  console.log(url);
  request(url).pipe(res);
};

var proxyBreweryBeers = function(req, res) {
  var url = 'http://api.brewerydb.com/v2/brewery/' + req.params[0] + '/beers?key=' + process.env.BREWERYDB_TOKEN;
  request(url).pipe(res);
};

/// Routes ///
app.use(express.static('./'));

app.get('/locations/*', proxyBreweryLocation);
app.get('/name/*', proxyBreweryName);
app.get('/beers/*', proxyBreweryBeers);

app.get('*', function(request, response) {
  // console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

/// Start Server ///
app.listen(port, function() {
  console.log('Express server started on port ' + port);
});
