(function(module) {
  function Brewery (opts) {
    Object.keys(opts).forEach(function(b, index, keys) {
      this[b] = opts[b];
    }, this);
  }

  Brewery.all = [];
  Brewery.ids = [];
  Brewery.filterResults = [];
  Brewery.dbComplete = false;

  var locationDBCount = 0;
  var nameDBCount = 0;
  var locationEndpointDone = false;
  var nameEndpointDone = false;

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

  var checkComplete = function() {
    if (locationEndpointDone === true && nameEndpointDone === true) {
      Brewery.dbComplete =true;
    };
  };

  Brewery.handleLocationEndpoint = function() {
    webDB.execute('SELECT * FROM breweryLocation', function(rows) {
      if (!rows.length) {
        Brewery.ids.forEach(function(id) {
          $.get('/locations/' + id, function(data) {
            var breweryInstance = new Brewery(data.data[0]);
            breweryInstance.insertLocationRecord(id);
            locationDBCount += 1;
            if (locationDBCount === Brewery.ids.length) {
              locationEndpointDone = true;
              checkComplete();
            };
          });
        });
      }
    });
  };

  Brewery.handleNameEndpoint = function() {
    webDB.execute('SELECT * FROM breweryName', function(rows) {
      if (!rows.length) {
        Brewery.ids.forEach(function(id) {
          $.get('/name/' + id, function(data) {
            var breweryInstance = new Brewery(data.data);
            breweryInstance.insertNameRecord();
            nameDBCount += 1;
            if (locationDBCount === Brewery.ids.length) {
              nameEndpointDone = true;
              checkComplete();
            };
          });
        });
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

  Brewery.findBreweryWhere = function(filterArray, sqlString, callback) {
    if (filterArray.length === 0) {
      webDB.execute('SELECT * FROM breweryLocation JOIN breweryName ON breweryLocation.breweryId=breweryName.breweryId', function(result) {
        Brewery.grabAllFilterData(result);
      });
    } else {
      webDB.execute('SELECT * FROM breweryName LEFT JOIN breweryBeers ON (breweryName.breweryId = breweryBeers.breweryId) WHERE ' + sqlString + ' GROUP BY breweryName.name HAVING COUNT(DISTINCT breweryBeers.categoryId) = ' + filterArray.length,
        function(result) {
          Brewery.grabAllFilterData(result);
        });
    }
  };

  Brewery.grabAllFilterData = function(results) {
    $('.brewery-container').hide();
    for (breweryId in markers) {
      markers[breweryId].setMap(null);
    };
    results.forEach(function(result){
      $('article[data-breweryId="' + result.breweryId + '"]').fadeIn();
      markers[result.breweryId].setMap(map);
    });
  };

  Brewery.saveAllBreweryData = function(rows) {
    Brewery.all = rows.map(function(brew) {
      return new Brewery(brew);
    });
  };

  Brewery.grabAllBreweryData = function() {
    webDB.execute('SELECT * FROM breweryLocation JOIN breweryName ON breweryLocation.breweryId=breweryName.breweryId', function(rows) {
      Brewery.saveAllBreweryData(rows);
    });
  };

  Brewery.initTables = function() {
    Brewery.createLocationTable(Brewery.handleLocationEndpoint);
    Brewery.createNameTable(Brewery.handleNameEndpoint);
  };

  module.Brewery = Brewery;
}(window));
