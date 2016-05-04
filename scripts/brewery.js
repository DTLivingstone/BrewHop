(function(module) {
  function Brewery (opts) {
    Object.keys(opts).forEach(function(b, index, keys) {
      this[b] = opts[b];
    }, this);
  }

  Brewery.ids = [];
  Brewery.all = [];

  var FilterUniqueBreweryIds = function() {
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

  //TODO: Refactor .joinTable and .findWhere into to one findWhere method that accepts an array of filter objects on different tables based on breweryId.
  //Set this up first in the view layer with checkbox inputs and values from DOM.
  // Brewery.joinTable = function(callback) {
  //   webDB.execute(
  //     [
  //       {
  //         'sql': 'SELECT * FROM breweryLocation JOIN breweryName ON breweryLocation.breweryId=breweryName.breweryId;'
  //       }
  //     ]
  //   );
  // };
  //
  // Brewery.findWhere = function(tableName, field, value, callback) {
  //   webDB.execute(
  //     [
  //       {
  //         sql: 'SELECT * FROM tableName WHERE ' + field + ' = ?;',
  //         data: [value]
  //       }
  //     ],
  //     callback
  //   );
  // };

  Brewery.searchFieldComplete = function() {
    console.log('autocomplete ready!');
    $('#brew-search-input').autocomplete(
      {
        source: Brewery.all.map(function(obj) {
          return obj.name;
        }),
        minLength: 3
      }
    );
  };
  $('#brew-search-input').on('focus', Brewery.searchFieldComplete);

  Brewery.initTables = function() {
    FilterUniqueBreweryIds();
    Brewery.createLocationTable(Brewery.handleLocationEndpoint);
    Brewery.createNameTable(Brewery.handleNameEndpoint);
  };

  module.Brewery = Brewery;
}(window));
