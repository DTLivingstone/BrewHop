(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    setTimeout(function() {
      $('#map').hide();
      $('#breweries').hide();
      $('.sidebar').hide();
      $('#about').show();
    });
  };

  module.aboutController = aboutController;
})(window);
