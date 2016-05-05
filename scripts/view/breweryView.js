(function(module) {

  var breweryView = {};

  var render = function(brewery) {
    var template = Handlebars.compile($('#brewery-template').text());
    
    return template(brewery);
  };

  breweryView.initProfilePage = function() {
    var template = Handlebars.compile($('#').text());
  };

  breweryView.initIndexPage = function() {
    Brewery.all.forEach(function(a){
      $('#breweries').append(a.toHtml());
    });
  };

  var filterArray = [];

  $('input[checked]').each(function() {
    var filterString = $(this).attr('name') + '=' + $(this).val();
    filterArray.push(filterString);
  });

  $('.results').html(filterArray.join(' AND '));
  console.log(filterArray);

  //TODO: create event listener on the checked boxes.


  module.breweryView = breweryView;
})(window);
