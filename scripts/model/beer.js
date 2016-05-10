(function(module) {
  function Beer(opts) {
    Object.keys(opts).forEach(function(b, index, keys) {
      this[b] = opts[b];
    }, this);
  };

  var beerDBCount = 0;
  Beer.dbComplete = false;

  Beer.handleBeerEndpoint = function() {
    webDB.execute('SELECT * FROM breweryBeers', function(rows) {
      if (!rows.length) {
        Brewery.ids.forEach(function(id) {
          $.get('/beers/' + id, function(data) {
            var breweryBeers = data.data;
            if (!breweryBeers) {
              return;
            }
            breweryBeers.forEach(function(beer){
              var beerInstance = new Beer(beer);
              beerInstance.insertBeerRecord(id);
              beerDBCount += 1;
              if (beerDBCount >= 670) { 
                Beer.dbComplete = true;
              };
            });
          });
        });
      };
    });
  };

  Beer.prototype.insertBeerRecord = function(id) {
    if (!this.style) {
      return;
    }
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO breweryBeers (breweryId, categoryId, name, description) VALUES (?, ?, ?, ?)',
          'data': [id, this.style.categoryId, this.name, this.description],
        }
      ]
    );
  };

  Beer.createBeerTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS breweryBeers (' +
      'id INTEGER PRIMARY KEY, ' +
      'breweryId, ' +
      'categoryId, ' +
      'name, ' +
      'shortName, ' +
      'description);'
    );
    callback();
  };

  Beer.initTables = function() {
    Beer.createBeerTable(Beer.handleBeerEndpoint);
  };

  module.Beer = Beer;
}(window));
