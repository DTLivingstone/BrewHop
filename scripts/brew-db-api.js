var breweries = {};
breweries.all = [];

breweries.requestBrew = function(callback) {
  $.get('/brewerydb/breweries')
  .done(function(data, message, xhr) {
    breweries.all = data;
  })
  .done(callback);
};

breweries.requestBrew();
