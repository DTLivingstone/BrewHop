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

  Brewery.handleTwitterHandleEndpoint = function() {
    console.log('foo');
    Brewery.ids.forEach(function(id) {
      $.get('/twitter-handle/' + id, function(data) {
        console.log(data);
        // var breweryInstance = new Brewery(data.data);
        // breweryInstance.insertTwitterHandleRecord();
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

  Brewery.prototype.insertTwitterHandleRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO breweryTwitterHandle (breweryId, twitterHandle) VALUES (?, ?)',
          'data': [this.id, this.twitterHandle],
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

  Brewery.createTwitterHandleTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS breweryTwitterHandle (' +
      'id INTEGER PRIMARY KEY, ' +
      'breweryId, ' +
      'screenName VARCHAR(255));'
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

  Brewery.handleTwitterEndpoint = function() {
  ////////////////
  };

  Brewery.handleYelpEndpoint = function() {
  ////////////////
  };

  Brewery.initTables = function() {
    FilterUniqueBreweryIds();
    Brewery.createLocationTable(Brewery.handleLocationEndpoint);
    Brewery.createNameTable(Brewery.handleNameEndpoint);
    Brewery.createTwitterHandleTable(Brewery.handleTwitterHandleEndpoint);
  };

  Brewery.loadBreweryNames();

  module.Brewery = Brewery;
}(window));
