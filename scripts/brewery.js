// (function(module) {
  function Brewery (opts) {
    Object.keys(opts).forEach(function(b, index, keys) {
      this[b] = opts[b];
    }, this);
  }

  Brewery.all = [];
  Brewery.ids = [];

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
  };

  Brewery.createTable = function(callback) {
    webDB.execute(
      //Create and join the above tables into breweries table using unique id keys.
    );
  };

  Brewery.fetchAll = function(callback) {
    webDB.execute('SELECT * FROM breweries', function(rows) {
      if (rows.length) {
        Brewery.loadAll(rows);
        callback();
      } else {
        //TODO: refactor to build brewery table.
        // $getJSON('data/breweries.json', function(rawData) {
        //   rawData.forEach(function(breweryEle) {
        //     Brewery.insertRecord();
        //   });
        //   webDB.execute('SELECT * FROM breweries', function(rows) {
        //     Brewery.loadAll(rows);
        //     callback();
        //   });
        // });
      }
    });
  };

  Brewery.findWhere = function(field, value, callback) {
    webDB.execute(
      [
        {
          sql: 'SELECT * FROM breweries WHERE ' + field + ' = ?;',
          data: [value]
        }
      ],
      callback
    );
  };

  FilterUniqueBreweryIds();
  Brewery.createLocationTable();
  Brewery.createNameTable();
  Brewery.handleLocationEndpoint();
  Brewery.handleNameEndpoint();

  // module.Brewery = Brewery;
// })(window);
