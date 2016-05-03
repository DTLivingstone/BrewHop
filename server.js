var request = require('request'),
  express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

var proxyBreweryLocation = function(req, res) {
  console.log('Routing BreweryDb request for', req.params[0]);
  var url = 'http://api.brewerydb.com/v2/brewery/' + req.params[0] + '/locations?' + process.env.BREWERYDB_TOKEN;
  request(url).pipe(res);
};

var proxyBrewerySocial = function(req, res) {
  var url = 'http://api.brewerydb.com/v2/brewery/' + req.params[0] + '/socialaccounts?' + process.env.BREWERYDB_TOKEN;
  request(url).pipe(res);
};

app.get('/locations/*', proxyBreweryLocation);
app.get('/socialaccounts/*', proxyBrewerySocial);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
