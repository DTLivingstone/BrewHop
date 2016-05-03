function Brewery (opts) {
  this.name = opts.name;
  this.id = opts.id;
}

Brewery.all = [];

Brewery.getAll = function() {
  $.getJSON('/data/breweries.json', function(data) {
    Brewery.loadById(data);
    localStorage.breweries = JSON.stringify(data);
  });
};

Brewery.loadById = function(data) {
  Brewery.all = data.map(function(ele) {
    return new Brewery(ele);
  });
};

Brewery.requestLocationById = function() {
  Brewery.all.forEach(function(b) {
    var breweryId = b.id;
    $.get('/locations/' + breweryId, function(data) {
      console.log(data);
    });
  });
};

Brewery.getAll();
Brewery.requestLocationById();
