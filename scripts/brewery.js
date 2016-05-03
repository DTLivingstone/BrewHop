// (function(module) {
  function Brewery (opts) {
    Object.keys(opts).forEach(function(b, index, keys) {
      this[b] = opts[b];
    }, this);
  }

  Brewery.all = [];
  Brewery.ids = [];

  var breweryIds = function() {
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
        var breweryInstance = new Brewery(data);
        breweryInstance.insertLocationRecord();
      });
    });
  };

  Brewery.loadAll = function(rows) {
    Brewery.all = rows.map(function(b) {
      return new Brewery(b);
    });
  };

  Brewery.idRecord = function() {
    Brewery.ids.forEach(function(id) {
      Brewery.insertBreweryId(id);
    });
  };

  Brewery.insertBreweryId = function(id) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO breweries (breweryId) VALUES (?)',
          'data': [id],
        }
      ]
    );
  };

  Brewery.prototype.insertLocationRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO breweries (streetAddress, postalCode, phone, latitude, longitude, openToPublic, hoursOfOperation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          'data': [this.streetAddress, this.postalCode, this.phone, this.latitude, this.longitude, this.openToPublic, this.hoursOfOperation],
        }
      ],
      callback
    );
  };

  Brewery.createTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS breweries (' +
        'id INTEGER PRIMARY KEY, ' +
        'name VARCHAR(255), ' +
        'breweryId, ' +
        'description TEXT, ' +
        'website VARCHAR(255), ' +
        'established DATE, ' +
        'isOrganic BOOLEAN, ' +
        'streetAddress VARCHAR(255), ' +
        'postalCode, ' +
        'phone VARCHAR(255), ' +
        'latitude FLOAT, ' +
        'longitude FLOAT, ' +
        'openToPublic BOOLEAN, ' +
        'hoursOfOperation VARCHAR(255));'
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

  Brewery.createTable();
  breweryIds();

  // module.Brewery = Brewery;
// })(window);
