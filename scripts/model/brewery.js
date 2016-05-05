(function(module) {
  function Brewery (opts) {
    Object.keys(opts).forEach(function(b, index, keys) {
      this[b] = opts[b];
    }, this);
  }

  Brewery.all = [];
  Brewery.ids = [];
  Brewery.names = [];

  Brewery.loadBreweryNames = function() {
    $.get('/data/breweries.json')
    .done(function(data) {
      Brewery.names = data.map(function(element){
        return element.name;
      });
    });
  };

  // Fill out an array of brewery ids to pick up on breweryDB URI routing
  Brewery.filterUniqueBreweryIds = function() {
    $.get('/data/breweries.json')
    .done(function(data) {
      data.forEach(function(b){
        if (Brewery.ids.indexOf(b.id) === -1) {
          Brewery.ids.push(b.id);
        }
      });
    });
  };

  Brewery.handleLocationEndpoint = function() {
    console.log('location endpoint');
    webDB.execute('SELECT * FROM breweryLocation', function(rows) {
      if (!rows.length) {
        Brewery.ids.forEach(function(id) {
          $.get('/locations/' + id, function(data) {
            var breweryInstance = new Brewery(data.data[0]);
            breweryInstance.insertLocationRecord(id);
          });
        });
      } else {
        console.log('locations already loaded');
      };
    });
  };

  Brewery.handleNameEndpoint = function() {
    console.log('name endpoint');
    webDB.execute('SELECT * FROM breweryName', function(rows) {
      if (!rows.length) {
        Brewery.ids.forEach(function(id) {
          $.get('/name/' + id, function(data) {
            var breweryInstance = new Brewery(data.data);
            breweryInstance.insertNameRecord();
          });
        });
      } else {
        console.log('names already loaded');
      };
    });
  };

  Brewery.handleTwitterHandleEndpoint = function() {
    console.log('Twitter endpoint');
    webDB.execute('SELECT * FROM breweryTwitterHandle', function(rows) {
      // console.log(rows);
      if (!rows.length) {
        Brewery.ids.forEach(function(id) {
          $.get('/twitter-handle/' + id, function(data) {
            for (var i in data.data) {
              if (data.data[i].socialMediaId == 2) {
                var breweryInstance = new Brewery({breweryId: id, twitterHandle: data.data[i].handle});
                breweryInstance.insertTwitterHandleRecord();
              };
            };
          });
        });
      } else {
        console.log('Twitter handles already loaded');
      };
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
          'data': [this.breweryId, this.twitterHandle],
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
      'hoursOfOperation VARCHAR(255));',
      callback
    );
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
      'isOrganic BOOLEAN);',
      callback
    );
  };

  Brewery.createTwitterHandleTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS breweryTwitterHandle (' +
      'id INTEGER PRIMARY KEY, ' +
      'breweryId, ' +
      'twitterHandle VARCHAR(255));',
      callback
    );
  };

  Brewery.findBreweryWhere = function(filterArray, sqlString, callback) {
    webDB.execute(
      [
        {
          'sql': 'SELECT * FROM breweryName LEFT JOIN breweryBeers ON (breweryName.breweryId = breweryBeers.breweryId) WHERE ' + sqlString + ' GROUP BY breweryName.name HAVING COUNT(DISTINCT breweryBeers.categoryId) = ' + filterArray.length,
        }
      ],
      callback
    );
  };


  Brewery.findBreweryWhere = function(filterArray, sqlString, callback) {
    webDB.execute(
      [
        {
          'sql': 'SELECT * FROM breweryName LEFT JOIN breweryBeers ON (breweryName.breweryId = breweryBeers.breweryId) WHERE ' + sqlString + ' GROUP BY breweryName.name HAVING COUNT(DISTINCT breweryBeers.categoryId) = ' + filterArray.length,
        }
      ],
      callback
    );
  };

  Brewery.saveAllBreweryData = function(rows) {
    Brewery.all = rows.map(function(brew) {
      return new Brewery(brew);
    });
  };

  //////// callback ////////
  Brewery.grabAllBreweryData = function() {
    console.log('Brewery.grabAllBreweryData');
    webDB.execute('SELECT * FROM breweryLocation ORDER BY id DESC', function(rows) {
      Brewery.saveAllBreweryData(rows);
    });
  };

  Brewery.searchFieldComplete = function() {
    console.log('autocomplete ready!');
    $('#brewery-input').autocomplete(
      {
        source: Brewery.names,
        minLength: 2
      }
    );
  };
  $('#brewery-input').on('focus', Brewery.searchFieldComplete);

  Brewery.handleTwitEndpoint = function() {

  };

  Brewery.handleYelpEndpoint = function() {

  };

  Brewery.initTables = function() {
    Brewery.filterUniqueBreweryIds();
    Brewery.createLocationTable(Brewery.handleLocationEndpoint);
    Brewery.createNameTable(Brewery.handleNameEndpoint);
    Brewery.createTwitterHandleTable(Brewery.handleTwitterHandleEndpoint);
    Brewery.grabAllBreweryData(); //this should be run as a callback after locations are loaded
  };

  Brewery.initTables();
  Brewery.loadBreweryNames();

  module.Brewery = Brewery;
}(window));
