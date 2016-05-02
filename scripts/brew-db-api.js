function Brewery (opts) {
  this.name = opts.name;
  this.id = opts.id;
}

Brewery.all = [];

Brewery.getById = function() {
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
    $.get('http://api.brewerydb.com/v2/brewery/17tUiZ/locations?key=326d241f836bab4e24f6511c1470dd95', function(data) {
      console.log(data);
    });
  });
};

Brewery.getById();
Brewery.requestLocationById();
