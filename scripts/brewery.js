function Brewery (opts) {
  this.name = opts.name;
  this.id = opts.id;
}

Brewery.all = [];

//TODO: Perhaps move this function to the server side (server reads our json file?).
Brewery.getAll = function() {
  $.getJSON('/data/breweries.json', function(data) {
    Brewery.loadById(data);
    localStorage.breweries = JSON.stringify(data);
  });
};

//TODO: Perhaps move this function to the server side (server reads our json file?).
Brewery.loadById = function(data) {
  Brewery.all = data.map(function(ele) {
    return new Brewery(ele);
  });
};

Brewery.requestLocationById = function(id) {
  //TODO: Refactor by passing in an id rather than iterating over Brewery.all
  Brewery.all.forEach(function(b) {
    var breweryId = b.id;
    $.get('/locations/' + breweryId, function(data) {
      console.log(data);
    });
  });
};

Brewery.requestSocialById = function(id) {
  //TODO: Refactor by passing in an id rather than iterating over Brewery.all
  Brewery.all.forEach(function(b) {
    var breweryId = b.id;
    $.get('/socialaccounts/' + breweryId, function(data) {
      console.log(data);
    });
  });
};

Brewery.getAll();
Brewery.requestLocationById();
Brewery.requestSocialById();