(function(module) {
  function Beer(opts) {
    Object.keys(opts).forEach(function(b, index, keys) {
      this[b] = opts[b];
    }, this);
  };

  Beer.handleBeerEndpoint = function() {
    Brewery.ids.forEach(function(id) {
      $.get('/beers/' + id, function(data) {
        var breweryBeers = data.data;
        breweryBeers.forEach(function(beer){
          var beerInstance = new Beer(beer);
          beerInstance.insertBeerRecord(id);
        });
      });
    });
  };

  Beer.handleBeerCategoryEndpoint = function() {
    $.get('/categories/', function(data) {
      var beerCategories = data.data;
      beerCategories.forEach(function(category){
        Beer.insertCategoryRecord(category);
      });
    });
  };

  Beer.prototype.insertBeerRecord = function(id) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO breweryBeers (breweryId, categoryId, name, description) VALUES (?, ?, ?, ?)',
          'data': [id, this.style.categoryId, this.name, this.description],
        }
      ]
    );
  };

  Beer.prototype.insertCategoryRecord = function(category) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO beerCategories (categoryId, name) VALUES (?, ?)',
          'data': [category.id, category.name],
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

  Beer.createBeerCategoryTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS beerCategories (' +
      'id INTEGER PRIMARY KEY, ' +
      'categoryId INTEGER, ' +
      'name VARCHAR(255));'
    );
    callback();
  };

  Beer.initTables = function() {
    Beer.createBeerTable(Beer.handleBeerEndpoint);
    Beer.createBeerCategoryTable(Beer.handleBeerCategoryEndpoint);
  };

  module.Beer = Beer;
}(window));
