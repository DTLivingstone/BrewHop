var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

var proxyBreweryDb = function(request, response) {
  console.log('Routing BreweryDb request for', request.params[0]);
  (requestProxy({
    url: 'api.brewerydb.com/v2/brewery/' + request.params[0] + '?' + process.env.BREWERYDB_TOKEN,
  }))(request, response);
};

app.get('/brewerydb/*', proxyBreweryDb);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
