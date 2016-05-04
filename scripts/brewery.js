(function(module) {
  function Brewery (opts) {
    Object.keys(opts).forEach(function(b, index, keys) {
      this[b] = opts[b];
    }, this);
  }

  Brewery.ids = [];
  Brewery.names = [];

  // Fill out an array of brewery names for autocomplete feature
  Brewery.loadBreweryNames = function() {
    $.get('/data/breweries.json')
    .done(function(data) {
      Brewery.names = data.map(function(element){
        return element.name;
      });
    });
  };

  var filterUniqueBreweryIds = function() {
    $.getJSON('/data/breweries.json', function(data) {
      data.forEach(function(b){
        if (Brewery.ids.indexOf(b.id) === -1) {
          Brewery.ids.push(b.id);
        }
      });
    });
  };

  Brewery.handleLocationEndpoint = function() {
    Brewery.ids.forEach(function(id) {
      $.get('/locations/' + id, function(data) {
        var breweryInstance = new Brewery(data.data[0]);
        breweryInstance.insertLocationRecord(id);
      });
    });
  };

  Brewery.handleNameEndpoint = function() {
    Brewery.ids.forEach(function(id) {
      $.get('/name/' + id, function(data) {
        var breweryInstance = new Brewery(data.data);
        breweryInstance.insertNameRecord();
      });
    });
  };

  Brewery.handleBeerEndpoint = function() {
    Brewery.ids.forEach(function(id) {
      $.get('/beers/' + id, function(data) {
        var breweryInstance = new Brewery(data);
        breweryInstance.insertBeerRecord();
      });
    });
  };

  Brewery.prototype.insertLocationRecord = function(id) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO breweryLocation (breweryId, streetAddress, postalCode, phone, latitude, longitude, openToPublic, hoursOfOperation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          'data': [id, this.streetAddress, this.postalCode, this.phone, this.latitude, this.longitude, this.openToPublic, this.hoursOfOperation],
        }
      ]
    );
  };

  Brewery.prototype.insertNameRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO breweryName (breweryId, name, description, website, established, isOrganic) VALUES (?, ?, ?, ?, ?, ?)',
          'data': [this.id, this.name, this.description, this.website, this.established, this.isOrganic],
        }
      ]
    );
  };

  Brewery.createLocationTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS breweryLocation (' +
        'id INTEGER PRIMARY KEY, ' +
        'breweryId, ' +
        'streetAddress VARCHAR(255), ' +
        'postalCode, ' +
        'phone VARCHAR(255), ' +
        'latitude FLOAT, ' +
        'longitude FLOAT, ' +
        'openToPublic BOOLEAN, ' +
        'hoursOfOperation VARCHAR(255));'
    );
    callback();
  };

  Brewery.createNameTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS breweryName (' +
      'id INTEGER PRIMARY KEY, ' +
      'breweryId, ' +
      'name VARCHAR(255), ' +
      'description TEXT, ' +
      'website VARCHAR(255), ' +
      'established DATE, ' +
      'isOrganic BOOLEAN);'
    );
    callback();
  };

  Brewery.createBreweryBeerTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS breweryBeers (' +
      'id INTEGER PRIMARY KEY, ' +
      'breweryId, ' +
      'categoryId, ' +
      ';'
    );
    callback();
  };

  Brewery.createBeerCategoryTable = function(callback) {
    webDB.execute(
        'CREATE TABLE IF NOT EXISTS beerCategories (' +
        'id INTEGER PRIMARY KEY, ' +
        'categoryId INTEGER' +
        'name VARCHAR(255);'
    );
    callback();
  };

  Brewery.findBreweryWhere = function(sqlString, callback) {
    webDB.execute(
      [
        {
          'sql': 'SELECT * FROM breweryLocation JOIN breweryName ON breweryLocation.breweryId=breweryName.breweryId WHERE ?;',
          'data': [sqlString]
        }
      ],
      callback
    );
  };

  Brewery.searchFieldComplete = function() {
    console.log('autocomplete ready!');
    $('#brew-search-input').autocomplete(
      {
        source: Brewery.names,
        minLength: 3
      }
    );
  };
  $('#brew-search-input').on('focus', Brewery.searchFieldComplete);

  Brewery.initTables = function() {
    filterUniqueBreweryIds();
    Brewery.createLocationTable(Brewery.handleLocationEndpoint);
    Brewery.createNameTable(Brewery.handleNameEndpoint);
    Brewery.createBeerCategoryTable(Brewery.handleCategoryEndpoint);
    Brewery.createBreweryBeerTable(Brewery.handleBeerEndpoint);
  };

  Brewery.loadBreweryNames();

  module.Brewery = Brewery;
}(window));
