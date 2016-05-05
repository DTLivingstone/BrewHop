// (function(module) {
  function Beer(opts) {
    Object.keys(opts).forEach(function(b, index, keys) {
      this[b] = opts[b];
    }, this);
  };

  Beer.handleBeerEndpoint = function() {
    Brewery.ids.forEach(function(id) {
      $.get('/beers/' + id, function(data) {
        // var beerInstance = new Beer(data);
        console.log(data);
        // beerInstance.insertBeerRecord(id);
      });
    });
  };

  Beer.prototype.insertBeerRecord = function(id) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO breweryBeers (breweryId, categoryId, name, shortName, description) VALUES (?, ?, ?, ?, ?)',
          'data': [this.id, this.categoryId, this.name, this.shortName, this.description],
        }
      ]
    );
  };

  Beer.prototype.insertCategoryRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO beerCategories (categoryId, name) VALUES (?, ?)',
          'data': [this.categoryId, this.name],
        }
      ]
    );
    callback;
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
    callback;
  };

  Beer.createBeerCategoryTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS beerCategories (' +
      'id INTEGER PRIMARY KEY, ' +
      'categoryId INTEGER, ' +
      'name VARCHAR(255));'
    );
    callback;
  };

  Beer.initTables = function() {
    Beer.createBeerTable(Beer.insertBeerRecord);
    // Beer.createBeerCategoryTable(Beer.insertCategoryRecord);
  };

  Beer.initTables();
  // module.Beer = Beer;
// }(window));
