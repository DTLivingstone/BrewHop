var requestProxy = require('express-request-proxy'),
  express = require('express'),
  BreweryDb = require('brewerydb-node'),
  port = process.env.PORT || 3000,
  app = express();
  brewdb = new BreweryDb(process.env.BREWERYDB_TOKEN);

var proxyBreweryDb = function(request, response) {
  console.log('Routing BreweryDb request for', request.params[0]);
  (requestProxy({
    url: 'api.brewerydb.com/v2/' + request.params[0] + '?key=' + process.env.BREWERYDB_TOKEN,
  }))(request, response);
};

brewdb.breweries.find( { established: 2010 }, function(err, data){
    console.log(data);
});

app.get('/brewerydb/*', proxyBreweryDb);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
