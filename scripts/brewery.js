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
        Brewery.all.push(new Brewery(data));
      });
    });
  };

  Brewery.createTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS breweries (' +
        'id PRIMARY KEY, ' +
        'name VARCHAR(255), ' +
        'description TEXT, ' +
        'website VARCHAR(255), ' +
        'established DATE, ' +
        'isOrganic BOOLEAN, ' +
        'streetAddress VARCHAR(255), ' +
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

  Brewery.insertLocationRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO breweries (id, streetAddress, postalCode, phone, latitude, longitude, openToPublic, hoursOfOperation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          'data': [this.id, this.streetAddress, this.postalCode, this.phone, this.latitude, this.longitude, this.openToPublic, this.hoursOfOperation],
        }
      ],
      callback
    );
  };

  Brewery.createTable();
  breweryIds();

  // module.Brewery = Brewery;
// })(window);
