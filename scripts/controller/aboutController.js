(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    setTimeout(function() {
      $('#map').hide();
      $('#breweries').hide();
      $('.sidebar').hide();
      $('#about').show();
    }, 1500);
  };

  module.aboutController = aboutController;
})(window);
